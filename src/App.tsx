import logo from './assets/logo.svg';

export function App() {
  return (
    <div className="h-screen w-screen px-12 py-6 flex flex-col text-shopperBlack">
      <div>
        <img src={logo} alt="logo Shopper" className="h-12" />
      </div>

      <div className="flex justify-center items-center gap-3">
        <input type="file" />

        <button type="submit" className="font-bold text-xl bg-shopperGreen py-3 px-6 rounded-lg">
          Validar
        </button>
      </div>
    </div>
  );
}
