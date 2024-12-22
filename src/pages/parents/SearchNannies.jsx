import SidebarFilters from "../../components/layout/SidebarFilters";
import NavBarParents from "../../components/layout/NavBarParents";
import Footer from "../../components/layout/Footer"
import ProfileCard from "../../components/layout/ProfileCard";
import '../../styles/SearchNannies.css'

export default function SearchNannies(){
    return(<>
            <NavBarParents className="navbar"/>
            <div className="div">
                <SidebarFilters className='sidebar'/>
                <div className="div2">
                    <ProfileCard/>
                    <ProfileCard/>
                    <ProfileCard/>
                    <ProfileCard/>
                    <ProfileCard/>

                </div>
            </div>
            <Footer/>
            </>);
}