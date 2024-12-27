import NavBarNannies from '../../components/layout/NavbarNannies';
import Footer from '../../components/layout/Footer'
import ImageNanny from '../../assets/images/nannyhome.jpg'
import '../../styles/NannyHomepage.css'

export default function NannyHomepage(){
    return( 
        <>
            <div className="nanny-homepage">
                <NavBarNannies />
                <img src={ImageNanny} />
                <Footer />
            </div>
        </>
    );
}