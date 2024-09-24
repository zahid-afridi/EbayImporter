import React, { useState } from "react";
import { Button, CardMedia, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

const ProductsCard = ({ data, dime }) => {
  const one = dime == 1;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div
      className={`${
        one ? "mx-2 w-60" : "flex items-center flex-row my-3 py-3"
      } shadow-md bg-white pb-3 rounded overflow-hidden`}
    >
      <img
        src={data?.image_url[0]}
        className={`round ${one ? "w-60" : "w-40"}`}
      />
      {/* <CardMedia
        title="green iguana"
        sx={{ height: 140 }}
        image={data?.image_url[0]}
        className={`round ${one ? "w-60" : "w-40"}`}
      /> */}
      {one && <hr className="my-2" />}
      <div className={`${"mx-2"}`}>
        <div className="flex flex-row">
          <p className="font-bold from-neutral-900 text-sm line-clamp-2">
            {data?.title}
          </p>
          {/* <Button
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={({ currentTarget }) => setAnchorEl(currentTarget)}
          > */}
          <MoreVert
            onClick={({ currentTarget }) => setAnchorEl(currentTarget)}
            id="demo-positioned-button"
            className="text-black"
          />
          {/* </Button> */}
        </div>
        <div className="flex flex-row py-2">
          <p className="font-bold text-sm text-green-500">{data?.value}</p>
          <p className="text-sm  text-green-500">{data?.price?.currency}</p>
        </div>
        <p className={`${one ? "line-clamp-3" : "line-clamp-2"} text-sm`}>
          {data?.description}
        </p>
      </div>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>View</MenuItem>
        <MenuItem onClick={handleClose}>Add </MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default ProductsCard;
