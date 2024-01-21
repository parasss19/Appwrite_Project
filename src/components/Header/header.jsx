import { Container, LogoutBtn, Logo } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";          //useSelector is used to get info from store that user is loged in or not
import { useNavigate } from "react-router-dom";     //for navigation

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status );

  const navigate = useNavigate();

  //when we made navbar like where we want to show buttons (login/logout) based on the user status
  //so we make one array(navItems) and then we loop it
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-400">

      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to= '/'>
              <Logo/>
            </Link>
          </div>
        </nav>

         <ul className="flex ml-auto">
          {
            navItems.map((item)=> 
              item.active 
                ? (
                <li key={item.name}>
                <button
                  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  onClick={()=> navigate(item.slug)}
                >
                 {item.name}
                </button>
                </li>
                )
                : null
            )     
          }

          {
            //For logout button display 
            //if authStatus is true then 2nd statement will be execute
            authStatus && (
              <li>
               <LogoutBtn/>
              </li>
            )
          }
          
         </ul>
      </Container>

    </header>
  )
     

};

export default Header;
