// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

function expandAll() {
    var prevlength = 0;
  
    function expand() {
      link = $("a._108_")
      if (link) {
        if (!$(".async_elem_saving")) {
          console.log("Not saving, checking length")
          if (document.body.innerText.length === prevlength) {
            console.log("lenght did not update after loading, exciting!")
            
            results = $$("[data-sigil=comment]").map( (element) => {
              profileLink = element.querySelector("a:not([data-click])")
              comment = element.querySelector("[data-sigil=comment-body]")
              return [
                profileLink.innerText,
                comment.innerText,
                profileLink.getAttribute("href"),
              ]
            })
            
            textarea = document.createElement('textarea');
            textarea.value = JSON.stringify(results);
            document.body.appendChild(textarea);
            textarea.select();
            console.log(results);
  
            return;
          } else {
            prevlength = document.body.innerText.length;
          }
          console.log("Clicking load more again")
          link.click();
        }
        setTimeout(expand, 2000);
      }
    }
    expand();
  }
  
  expandAll();

//https://react-http-experience-default-rtdb.firebaseio.com/