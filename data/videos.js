export function getVideo(videoId){
  let matchingVideo
  videos.forEach((video)=>{
      if (videoId===video.id) {
          matchingVideo=video
      }
  })
  return matchingVideo
}

export const videos = [
{
  id: "3b4cc754-543e-4788-b42f-6d26434fad7e",
  thumbnail: "pictures/thumbnails/thumbnail-1.webp",
  profilePic: "pictures/profile-pic/channel-1.jpeg",
  title: "Talking Tech and AI with Google CEO Sundar Pichai!",
  channel: "Marques Brownlee",
  views: "3.4M",
  date: "6 months",
  videoTime: "14:20",
  link: "https://www.youtube.com/watch?v=n2RNcPRtAiY",
  subs:'19,2M'
},
{
  id: "564af998-e162-4c01-9b6d-eef92851c7a9",
  thumbnail: "pictures/thumbnails/thumbnail-2.webp",
  profilePic: "pictures/profile-pic/channel-2.jpeg",
  title: "Try Not To Laugh Challange #9",
  channel: "Markiplier",
  views: "19M",
  date: "4 years",
  videoTime: "8:22",
  link: "https://www.youtube.com/watch?v=mP0RAo9SKZk",
  subs:'36,8M'
},
{
  id: "af08636c-2f0e-42a7-870b-59ddd0c33d0e",
  thumbnail: "pictures/thumbnails/thumbnail-3.webp",
  profilePic: "pictures/profile-pic/channel-3.jpeg",
  title: "Crazy Tik Toks Taken Moments Before DISASTER",
  channel: "SSSniperWolf",
  views: "12M",
  date: "1 year",
  videoTime: "9:13",
  link: "https://www.youtube.com/watch?v=FgjPQQeTh1w",
  subs:'34,5M'
},
{
  id: "f6c5b293-5b95-4d85-aaf9-eb56ff3ceb1d",
  thumbnail: "pictures/thumbnails/thumbnail-4.webp",
  profilePic: "pictures/profile-pic/channel-4.jpeg",
  title: "The Simplest Math Problem No One Can Solve - Collatz Conjecture",
  channel: "Veritasium",
  views: "18M",
  date: "4 months",
  videoTime: "22:09",
  link: "https://www.youtube.com/watch?v=094y1Z2wpJg",
  subs:'15,9M'
},
{
  id: "c8db4489-4a52-4405-8588-168ebca43b72",
  thumbnail: "pictures/thumbnails/thumbnail-5.webp",
  profilePic: "pictures/profile-pic/channel-5.jpeg",
  title: "Kadane's Algorithm to Maximum Sum Subarray Problem",
  channel: "CS Dojo",
  views: "519K",
  date: "5 years",
  videoTime: "11:17",
  link: "https://www.youtube.com/watch?v=86CQq3pKSUw",
  subs:'1,94M'
},
{
  id: "2ce1d622-c991-49e1-86ae-d898c140a708",
  thumbnail: "pictures/thumbnails/thumbnail-6.webp",
  profilePic: "pictures/profile-pic/channel-6.jpeg",
  title: "Anything You Can Fit In The Circle I’ll Pay For",
  channel: "MrBeast",
  views: "141M",
  date: "1 year",
  videoTime: "19:59",
  link: "https://www.youtube.com/watch?v=yXWw0_UfSFg",
  subs:'308M'
},
{
  id: "d775efcc-7923-47fc-8556-ec2b77593cc6",
  thumbnail: "pictures/thumbnails/thumbnail-7.webp",
  profilePic: "pictures/profile-pic/channel-7.jpeg",
  title: "Why Planes Don't Fly Over Tibet",
  channel: "RealLifeLore",
  views: "6.6M",
  date: "1 year",
  videoTime: "10:13",
  link: "https://www.youtube.com/watch?v=fNVa1qMbF9Y",
  subs:'7,53M'
},
{
  id: "4e5624a0-b59b-427e-b963-d3ce616b9472",
  thumbnail: "pictures/thumbnails/thumbnail-8.webp",
  profilePic: "pictures/profile-pic/channel-8.jpeg",
  title: "Inside The World's Biggest Passenger Plane",
  channel: "Tech Vision",
  views: "3.7M",
  date: "10 months",
  videoTime: "7:12",
  link: "https://www.youtube.com/watch?v=lFm4EM1juls",
  subs:'837K'
},
{
  id: "73c03d2e-e53e-4cb5-afb0-6a1ecdcb1f56",
  thumbnail: "pictures/thumbnails/thumbnail-9.webp",
  profilePic: "pictures/profile-pic/channel-9.jpeg",
  title: "The SECRET to Super Human STRENGTH",
  channel: "ThenX",
  views: "20М",
  date: "3 year",
  videoTime: "13:17",
  link: "https://www.youtube.com/watch?v=ixmxOlcrlUc",
  subs: '7,79M'
},
{
  id: "49f49651-cd6d-45b9-9ab3-873d78f52c1d",
  thumbnail: "pictures/thumbnails/thumbnail-10.webp",
  profilePic: "pictures/profile-pic/channel-10.jpeg",
  title: "How The World's Largest Cruise Ship Makes 30,000 Meals Every Day",
  channel: "Business Insider",
  views: "14M",
  date: "1 year",
  videoTime: "7:53",
  link: "https://www.youtube.com/watch?v=R2vXbFp5C9o",
  subs:'9,4M'
},
{
  id: "fd7f12ba-da27-4b04-b2c0-0268683fa444",
  thumbnail: "pictures/thumbnails/thumbnail-11.webp",
  profilePic: "pictures/profile-pic/channel-11.jpeg",
  title: "Dubai's Crazy Underwater Train and Other Things #Only in Dubai",
  channel: "Destination Tips",
  views: "3M",
  date: "1 year",
  videoTime: "4:10",
  link: "https://www.youtube.com/watch?v=0nZuYyXET3s",
  subs:'282K'
},
{
  id: "4262ac6c-9d90-418d-aab4-93f5a5c05614",
  thumbnail: "pictures/thumbnails/thumbnail-12.webp",
  profilePic: "pictures/profile-pic/channel-12.jpeg",
  title: "What would happen if you didn’t drink water? - Mia Nacamulli",
  channel: "TED-Ed",
  views: "12M",
  date: "5 year",
  videoTime: "4:51",
  link: "https://www.youtube.com/watch?v=9iMGFqMmUFs",
  subs:'20,2M'
},
];
