import { Frame, Modal } from "@shopify/polaris";

export const HomeProductModal = ({
  onClose,
  activator,
  onPrimeAction,
  open,
  des,
  price,
  title,
}) => {
  return (
    <div>
      <Frame>
        <Modal
          activator={activator}
          open={open}
          onClose={onClose}
          title={title}
          primaryAction={{
            content: "Add to Shopify",
            onAction: onPrimeAction,
          }}
        >
          <Modal.Section>
            <div className="flex flex-wrap ">
              <img
                className="w-2/4"
                src="https://cdn.britannica.com/91/81291-050-1CDF67EB/house-mouse.jpg?w=400&h=300&c=crop"
              />
              <div>
                <p className="my-3 font-bold">price: {price}</p>
                <p className="font-semibold1">{des}</p>
              </div>
            </div>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
};
