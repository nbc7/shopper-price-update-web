import { ChangeEvent, FormEvent, useState } from 'react';
import Papa from 'papaparse';

import logo from './assets/logo.svg';
import { api } from './lib/axios';

export function App() {
  const [file, setFile] = useState<File | null>(null);

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
    console.log(validateResponse.data);
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
    </div>
  );
}
