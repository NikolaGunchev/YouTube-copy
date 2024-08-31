export function loadSubscribers(users,getChannel,activeProfile) {
    let subsHtml = ``;

    users.userData.forEach((user) => {
      if (user.name === activeProfile) {
        user.subscribers.forEach((sub) => {
          let matchingSub = getChannel(sub);

          subsHtml += `
          <div class="profile">
            <img src=${matchingSub.profilePic} />
            <p>${matchingSub.name}</p>
          </div>
          `;
        });
      }
    });
    return subsHtml;
  }