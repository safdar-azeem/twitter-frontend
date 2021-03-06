import React from 'react'
import TweetGroupExplore from '../../components/explore/TweetGroup.explore';
import SearchUserExplore from '../../components/explore/SearchUser.explore';

const Explore = () => {

	return (
		<div className='py-md-5 px-md-2 pt-1'>
			<SearchUserExplore />
			<TweetGroupExplore />
		</div>
	);
}

export default Explore