import {Link} from "react-router-dom";
import Logo from "../Header/Logo";
import { Icon } from "@iconify/react/dist/iconify.js";
import { headerData } from "../Header/Navigation/menuData";

const Footer = () => {
  return (
    <footer className="bg-deepSlate py-10" style={{boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.2)",paddingTop: 5}}>
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="grid grid-cols-1 gap-y-15 gap-x-18 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8" >
          <div className='col-span-4 md:col-span-12 lg:col-span-4' style={{display: 'flex', flexDirection: 'column', gap: '30px',marginLeft: '60px'}}>
            <div style={{marginTop: '50px',marginLeft: '5px'}}><Logo /></div>
            <div className='flex items-center gap-4' style={{marginLeft: '15px'}}>
              <Link to="#" className='hover:text-primary text-black text-3xl'>
                <Icon icon="tabler:brand-facebook" />
              </Link>
              <Link to="#" className='hover:text-primary text-black text-3xl'>
                <Icon icon="tabler:brand-twitter" />
              </Link>
              <Link to="#" className='hover:text-primary text-black text-3xl'>
                <Icon icon="tabler:brand-instagram" />
              </Link>
            </div>
          </div>
          <div className="col-span-2">
            <h3 className="mb-4 text-2xl font-medium">Links</h3>
            <ul>
              {headerData.map((item, index) => (
                <li key={index} className="mb-2 text-black/50 hover:text-primary w-fit">
                  <Link to={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2">
            <h3 className="mb-4 text-2xl font-medium">Other</h3>
            <ul>
              <li className="mb-2 text-black/50 hover:text-primary w-fit">
                <Link to="/about">
                  About Us
                </Link>
              </li>
              <li className="mb-2 text-black/50 hover:text-primary w-fit">
                <Link to="/team">
                  Our Team
                </Link>
              </li>
              <li className="mb-2 text-black/50 hover:text-primary w-fit">
                <Link to="/career">
                  Career
                </Link>
              </li>
              <li className="mb-2 text-black/50 hover:text-primary w-fit">
                <Link to="/services">
                  Services
                </Link>
              </li>
              <li className="mb-2 text-black/50 hover:text-primary w-fit">
                <Link to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className='col-span-4 md:col-span-4 lg:col-span-4'>
            <div className="flex items-center gap-2">
              <Icon
                icon="tabler:brand-google-maps"
                className="text-primary text-3xl inline-block me-2"
              />
              <h5 className="text-lg text-black/60">925 Filbert Street Pennsylvania 18072</h5>
            </div>
            <div className="flex gap-2 mt-10">
              <Icon
                icon="tabler:phone"
                className="text-primary text-3xl inline-block me-2"
              />
              <h5 className="text-lg text-black/60">+45 3411-4411</h5>
            </div>
            <div className="flex gap-2 mt-10">
              <Icon
                icon="tabler:folder"
                className="text-primary text-3xl inline-block me-2"
              />
              <h5 className="text-lg text-black/60">info@gmail.com</h5>
            </div>
          </div>
        </div>

        <div className='mt-10 lg:flex items-center justify-between' >
          <h4 className='text-black/50 text-sm text-center lg:text-start font-normal mt-10 '>
            @2025 Agency. All Rights Reserved by{' '}
            <a 
              href="https://getnextjstemplates.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              GetNextJsTemplates.com
            </a>
          </h4>
          <div className="flex gap-5 mt-5 lg:mt-0 justify-center lg:justify-start">
            <Link to="/privacy" className='text-black/50 text-sm font-normal hover:text-primary'>
              Privacy policy
            </Link>
            <Link to="/terms" className='text-black/50 text-sm font-normal hover:text-primary'>
              Terms & conditions
            </Link>
          </div>
          <h4 className='text-black/50 text-sm text-center lg:text-start font-normal'>
            Distributed by{' '}
            <a 
              href="https://themewagon.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              ThemeWagon
            </a>
          </h4>
        </div>
      </div>
    </footer>
  )
}

export default Footer;