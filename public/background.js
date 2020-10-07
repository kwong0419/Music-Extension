/*global chrome*/
console.log("background running");

// chrome.runtime.onMessage.addListener(receiver);

// window.title = "";

// function receiver(request, sender, sendResponse) {
//   console.log(request);
//   window.title = request.title;
// }

const CLIENT_ID = encodeURIComponent("7c15aba07d5a4cf394a8b745c6df7bac");
const RESPONSE_TYPE = encodeURIComponent("token");
const REDIRECT_URI = encodeURIComponent(
  "http://enlcncnogcnflpiioonanamloaggnemm.chromiumapp.org/"
);
const SCOPE = encodeURIComponent("user-read-email");
const SHOW_DIALOG = encodeURIComponent("true");
let STATE = "";
let ACCESS_TOKEN = "";

let user_signed_in = false;

const create_spotify_endpoint = () => {
  STATE = encodeURIComponent(
    "meet" + Math.random().toString(36).substring(2, 15)
  );

  let oauth2_url = `https://accounts.spotify.com/authorize
?client_id=${CLIENT_ID}
&response_type=${RESPONSE_TYPE}
&redirect_uri=${REDIRECT_URI}
&state=${STATE}
&scope=${SCOPE}
&show_dialog=${SHOW_DIALOG}
`;

  console.log(oauth2_url);

  return oauth2_url;
};

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.message === "login") {
//     if (user_signed_in) {
//       console.log("User is already signed in.");
//     } else {
//       chrome.identity.launchWebAuthFlow(

//         {
//           url: create_spotify_endpoint(),
//           interactive: true,
//         },

//         function (redirect_url) {
//           if (chrome.runtime.lastError) {
//             sendResponse({ message: "fail" });
//           } else {
//             if (redirect_url.includes("callback?error=access_denied")) {
//               sendResponse({ message: "fail" });
//             } else {
//               ACCESS_TOKEN = redirect_url.substring(
//                 redirect_url.indexOf("access_token=") + 13
//               );
//               ACCESS_TOKEN = ACCESS_TOKEN.substring(
//                 0,
//                 ACCESS_TOKEN.indexOf("&")
//               );
//               let state = redirect_url.substring(
//                 redirect_url.indexOf("state=") + 6
//               );
//               if (state === STATE) {
//                 console.log("SUCCESS");
//                 user_signed_in = true;
//                 setTimeout(() => {
//                   ACCESS_TOKEN = "";
//                   user_signed_in = false;
//                 }, 3600000);
//                 // chrome.browserAction.setPopup(
//                 //   { popup: "./popup-signed-in.html" },
//                 //   () => {
//                 //     sendResponse({ message: "success" });
//                 //   }
//                 // );
//               } else {
//                 sendResponse({ message: "fail" });
//               }
//             }
//           }
//         }
//       );
//       // sign the user in with Spotify
//     }
//     return true;
//   } else if (request.message === "logout") {
//     user_signed_in = false;
//     chrome.browserAction.setPopup({ popup: "./popup.html" }, () => {
//       sendResponse({ message: "success" });
//     });

//     return true;
//   }
// });