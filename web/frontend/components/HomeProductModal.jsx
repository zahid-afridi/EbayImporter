import { Frame, Modal } from "@shopify/polaris";

export const HomeProductModal = ({
  onClose,
  activator,
  onPrimeAction,
  open,
  des,
  price,
  title,
  image,
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
            <div>
              <img className="w-2/4" src={image} />
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
