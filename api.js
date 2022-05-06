export const getBooks = async (searchTerm, resultPage) => {
    const responsePromise = fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${resultPage*10}&key=AIzaSyBwD01Hkd8UwefnYiVyyklQbOLB8dLL9tg`
    );
    // console.log("Pending State", responsePromise);
    // Waiting until response metadata is downloaded
    const response = await responsePromise;
    // console.log("Response Object", response);
    // console.log("Fulfilled or Reject State", responsePromise);
    // Waiting until response body is downloaded
    const json = await response.json();
    console.log("getBooks:", searchTerm, json);

    return json;
};