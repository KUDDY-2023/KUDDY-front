import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function YouTube() {
	const [playlist, setPlaylist] = useState([]);
	const [videolist, setVideolist] = useState([]);

	const channerId = 'UCEf_Bc-KVd7onSeifS3py9g'; // smtown 채널
	const playlistId = 'PLA91TLEzZINtF4_JdXdklKkTQEaX2KNXS'; // 재생목록 id?
	const key = process.env.REACT_APP_YOUTUBE_API_KEY;

	// 재생목록 가져오기
	useEffect(() => {
		// 특정 재생목록
		// axios
		// 	.get(
		// 		`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${key}`,
		// 	)
		// 	.then(res => {
		// 		console.log(res);
		// 		setVideolist(res.data.items);
		// 		// 유튜브 링크 + (snippet > resourceId >> videoId)
		// 		// 로 유튜브 링크 이동 가능
		// 	})
		// 	.catch(() => {});\

		// 특정 채널의 재생목록
		axios
			.get(
				`https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channerId}&maxResults=50&key=${key}`,
			)
			.then(res => {
				console.log(res);
				setPlaylist(res.data.items);
			})
			.catch(() => {});
	}, []);

	return (
		<div className="container">
			{playlist &&
				playlist.map((i: any, idx) => {
					return (
						<div className="playlist" key={idx}>
							<img src={i.snippet.thumbnails.high?.url} alt="" />
							<Link to={'https://www.youtube.com/watch?v=' + i.id}>
								<h1>{i.snippet.localized['title']}</h1>
							</Link>
							<p>{i.snippet.localized['description']}</p>
						</div>
					);
				})}
		</div>
	);
}
