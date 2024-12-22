import NavBarParents from '../../components/layout/NavBarParents';
import Footer from '../../components/layout/Footer'
import ImageParent from '../../assets/images/parents2.jpg'
import '../../styles/ParentHomepage.css'

export default function ParentHomepage(){
    return( 
        <>
            <div className="parent-homepage">
                <NavBarParents />
                <img src={ImageParent} />
                <Footer />
            </div>
        </>
    );
}