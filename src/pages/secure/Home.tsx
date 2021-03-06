import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../../components/common/Nav';
import SideBar from "../../components/sidebar/SideBar";

const Home = () => {
  return (
		<div>
			<section className='container'>
				<div className='row gx-0'>
					<aside className='col-xl-2 col-lg-1 col-12 '>
						<div className='w-100 position-relative '>
							<div className='position-fixed borde  px-lg-0 px-md-4 px-2 w-lg-auto w-100 left-lg-0 bg-white ' style={{zIndex:"10"}}>
								<Nav />
							</div>
						</div>
					</aside>

					<main className='col-xl-6 col-lg-7  col-md-7 col-12'>
						<div className='border-md rounded-3 rounded-lg-0 min-vh-100 my-lg-0 my-9'>
							<Outlet />
						</div>
					</main>

					<aside className='col-xl-4 col-lg-4 col-md-5 col-12'>
						<div className='d-md-block d-none'>
							<SideBar />
						</div>
					</aside>
				</div>
			</section>
		</div>
	);
}

export default Home