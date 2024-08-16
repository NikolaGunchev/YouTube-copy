export function getChannel(channelName){
  let matchingChannel
  channels.forEach((channel)=>{
      if (channelName===channel.name) {
        matchingChannel=channel
      }
  })
  return matchingChannel
}

export const channels = [
  {
    id: "daa87f9e-a717-4bfc-bee0-c2dcf272c6c6",
    name: "Marques Brownlee",
    profilePic: "pictures/profile-pic/channel-1.jpeg",
    subsribers: "19,2M",
  },
  {
    id: "0e8b213c-fb6f-4240-b3f4-f39856ebc6bf",
    name: "Markiplier",
    profilePic: "pictures/profile-pic/channel-2.jpeg",
    subsribers: "36,8M",
  },
  {
    id: "1fc1fe01-7c30-4f22-947f-be5ec3159afa",
    name: "SSSniperWolf",
    profilePic: "pictures/profile-pic/channel-3.jpeg",
    subsribers: "34,5M",
  },
  {
    id: "2ef89210-0a0c-4cba-8a89-dd353f1ada37",
    name: "Veritasium",
    profilePic: "pictures/profile-pic/channel-4.jpeg",
    subsribers: "15,9M",
  },
  {
    id: "c814a86b-23c8-4fcc-b8e8-49e5da6c5212",
    name: "CS Dojo",
    profilePic: "pictures/profile-pic/channel-5.jpeg",
    subsribers: "1,94M",
  },
  {
    id: "cb248efb-4122-49a8-b73c-21a249d6d760",
    name: "MrBeast",
    profilePic: "pictures/profile-pic/channel-6.jpeg",
    subsribers: "308M",
  },
  {
    id: "7560f9d3-615b-49fb-9e99-7224ad669527",
    name: "RealLifeLore",
    profilePic: "pictures/profile-pic/channel-7.jpeg",
    subsribers: "7,53M",
  },
  {
    id: "189bbe03-94d7-450c-b9a1-4b799ed1eb81",
    name: "Tech Vision",
    profilePic: "pictures/profile-pic/channel-8.jpeg",
    subsribers: "837K",
  },
  {
    id: "a45d6e72-4176-422b-ae6a-765726af704e",
    name: "ThenX",
    profilePic: "pictures/profile-pic/channel-9.jpeg",
    subsribers: "7,79M",
  },
  {
    id: "3e2ee52d-e0d5-4fcb-b653-c50672b17a75",
    name: "Business Insider",
    profilePic: "pictures/profile-pic/channel-10.jpeg",
    subsribers: "9,4M",
  },
  {
    id: "ecfe5f85-59a9-4009-876c-391605107d94",
    name: "Destination Tips",
    profilePic: "pictures/profile-pic/channel-11.jpeg",
    subsribers: "282K",
  },
  {
    id: "e5d7183a-0aac-4f20-a01c-617addf16a5a",
    name: "TED-Ed",
    profilePic: "pictures/profile-pic/channel-12.jpeg",
    subsribers: "20,2M",
  },
];
