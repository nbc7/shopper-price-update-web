interface ProductRowProps {
  error: any;
  productCode: number;
  productName: string;
  productSalesPrice: string;
  newPrice: number;
}

export function ProductRow({ error, productCode, productName, productSalesPrice, newPrice }: ProductRowProps) {
  return (
    <tr className="text-center border-t border-t-shopperBlack hover:bg-gray-300">
      <td>{error}</td>
      <td>{productCode}</td>
      <td>{productName}</td>
      <td>{productSalesPrice}</td>
      <td>{newPrice}</td>
    </tr>
  );
}
