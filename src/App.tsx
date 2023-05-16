import { ChangeEvent, FormEvent, useState } from 'react';
import Papa from 'papaparse';

import logo from './assets/logo.svg';
import { api } from './lib/axios';
import { ProductRow } from './components/ProductRow';
import { Error } from './components/Error';

interface ProductProps {
  code: number;
  name: string;
  sales_price: string;
  cost_price: string;
  new_price: number;
}

interface ValidationErrorProps {
  index: number;
  field: string;
  message: string;
}

export function App() {
  const [file, setFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<ValidationErrorProps[] | null>(null);
  const [products, setProducts] = useState<ProductProps[] | null>(null);

  function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    if (!event.target.files || event.target.files[0] === undefined) return;

    const uploadedFile = event.target.files[0];

    setFile(uploadedFile);
  }

  async function handleValidate(event: FormEvent) {
    event.preventDefault();

    if (!file) return;

    const data: number[][] = await new Promise((resolve) => {
      Papa.parse(file, {
        dynamicTyping: true,
        complete: (results) => {
          results.data.shift();
          resolve(results.data as any);
        },
      });
    });

    const csvData = data.map((row) => {
      return { code: row[0], new_price: row[1] };
    });

    const validateResponse = await api.post('/validate', { csvData });

    setValidationError(validateResponse.data.errorList.length > 0 ? validateResponse.data.errorList : null);
    setProducts(validateResponse.data.productChanges);
  }

  return (
    <div className="h-screen w-screen px-12 py-6 flex flex-col text-shopperBlack">
      <div>
        <img src={logo} alt="logo Shopper" className="h-12" />
      </div>

      <form onSubmit={handleValidate}>
        <div className="flex justify-center items-center gap-6">
          <input type="file" accept=".csv" onChange={handleFileUpload} />

          <button type="submit" className="font-bold text-xl bg-shopperBlack text-white py-3 px-6 rounded-lg hover:bg-shopperLightBlack">
            Validar
          </button>
        </div>
      </form>

      <div className="mt-12 px-20">
        <div className="border-2 border-shopperBlack rounded-lg">
          <table className="w-full">
            <tbody>
              <tr>
                <th className="w-16">Erro</th>
                <th className="w-32">Código</th>
                <th>Nome do produto</th>
                <th className="w-32">Preço atual</th>
                <th className="w-32">Novo preço</th>
              </tr>

              {products &&
                products.map((product, index) => (
                  <ProductRow
                    key={index}
                    error={
                      validationError && validationError.filter((error: any) => error.index === index).length > 0 ? (
                        <Error
                          children={validationError
                            .filter((error: any) => error.index === index)
                            .map((error, i) => {
                              return (
                                <div key={`${index}-${i}}`}>
                                  <span>• {error.message}</span>
                                </div>
                              );
                            })}
                        />
                      ) : null
                    }
                    productCode={product.code}
                    productName={product.name}
                    productSalesPrice={product.sales_price}
                    newPrice={product.new_price}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
