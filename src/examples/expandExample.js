const expandExample = ` 	function expandAll() {
  var prevlength = 0;

  function expand() {
    link = $("a._108_")
    if (link) {
      if (!$(".async_elem_saving")) {
        console.log("Not loading can do stuff")
        if (document.body.innerText.length === prevlength) {
          console.log("lenght did not update after loading, exciting!")
          
          results = $$("[data-sigil=comment]").map( (element) => {
            profileLink = element.querySelector("a:not([data-click])")
            comment = element.querySelector("[data-sigil=comment-body]")
            commentId = comment.getAttribute('data-commentid')
            return [
              profileLink.innerText,
              comment.innerText,
              profileLink.getAttribute("href"),
              commentId,
            ]
          })
          
          textarea = document.createElement('textarea');
          textarea.value = JSON.stringify(results);
          document.body.appendChild(textarea);
          textarea.style = "position: fixed; width: 80%; height:80%; top:10%; left:10%"
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
`

  export default expandExample;