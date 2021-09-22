import Product from "./Product";
import { useSelector } from "react-redux";
import {
  selectAllProductIds,
  selectAllProducts,
} from "./fundingDataSlice";

const ProjectInformation = ({
  handleModal,
}: {
  handleModal: (status: "open" | "close") => void;
}) => {
  const productIds = useSelector(selectAllProductIds);
  const products = useSelector(selectAllProducts);

  return (
    <section className="content-section project-information">
      <h1>About this project</h1>
      <p>
        The Mastercraft Bamboo Monitor Riser is a sturdy and stylish
        platform that elevates your screen to a more comfortable
        viewing height. Placing your monitor at eye level has the
        potential to improve your posture and make you more
        comfortable while at work, helping you stay focused on the
        task at hand.
      </p>
      <p>
        Featuring artisan craftsmanship, the simplicity of design
        creates extra desk space below your computer to allow
        notepads, pens, and USB sticks to be stored under the stand.
      </p>

      {productIds.map((id) => {
        return (
          <div key={"id-" + id} className="single-product">
            <Product data={products[id]} handleModal={handleModal} />
          </div>
        );
      })}
    </section>
  );
};

export default ProjectInformation;
