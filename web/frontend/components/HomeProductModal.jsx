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
  load,
  noBtn,
}) => {
  return (
    <div>
      <Frame>
        <Modal
          activator={activator}
          open={open}
          onClose={onClose}
          title={title}
          primaryAction={
            noBtn
              ? null
              : {
                  content: `${load ? "uploading..." : "Add to Shopify"}`,
                  onAction: onPrimeAction,
                  disabled: load,
                }
          }
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
