// styles
import Styles from "./loader.module.scss";

const Loader = () => {
    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className={Styles.lds_ripple}>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loader;
