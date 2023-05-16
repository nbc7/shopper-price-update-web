export function Error({ children }: { children: any }) {
  return (
    <div className="w-6 h-6 bg-red-700 inline-table rounded-full text-white hover:bg-red-900 group">
      !
      <div className="invisible group-hover:visible absolute border-b-[12px] border-l-[6px] border-r-[6px] border-b-shopperBlack border-l-transparent border-r-transparent h-3 w-3 translate-x-6 -translate-y-9 rotate-[-130deg]"></div>
      <div className="invisible group-hover:visible absolute text-shopperBlack bg-white border border-shopperBlack px-6 py-3 rounded-lg translate-x-[31px] -translate-y-[79px] shadow-md shadow-zinc-700">
        {children}
      </div>
      <div className="invisible group-hover:visible absolute border-b-[12px] border-l-[6px] border-r-[6px] border-b-white border-l-transparent border-r-transparent h-3 w-3 translate-x-[25px] -translate-y-[37px] rotate-[-130deg]"></div>
    </div>
  );
}
