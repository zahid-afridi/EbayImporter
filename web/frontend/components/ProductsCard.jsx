import React from "react";

const ProductsCard = ({ data, dime }) => {
  const one = dime == 1;
  console.log("data", data);
  return (
    <div className={`${one ? "flex-row" : "flex-col"}`}>
      <div className={`${one ? "px-2 w-60" : "flex flex-row py-3"}`}>
        <img
          src={data?.image_url[0]}
          className={`round ${one ? "w-60" : "w-40"}`}
        />
        <div className={`${one ? "" : "px-4"}`}>
          <p className="font-bold from-neutral-900 text-sm">{data?.title}</p>
          <div className="flex flex-row py-2">
            <p className="font-bold text-sm text-green-500">{data?.value}</p>
            <p className="text-sm  text-green-500">{data?.price?.currency}</p>
          </div>
          <p className={`${one ? "line-clamp-3" : "line-clamp-2"} text-sm`}>
            {data?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
