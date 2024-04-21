<script lang="ts">
  export let image: string;
  export let email: string;
  enum state {
    IDLE,
    LOADING,
    SUCCESS,
    ERROR,
  }
  let currentState = state.IDLE;
</script>

<div class="flex">
  <img
    src={image}
    class="max-h-[80px] w-48 rounded-sm mr-5"
    style="object-fit: cover;"
  />
  <div class="w-full grid">
    <p class="font-mono text-sm">{image.split("/").pop()}</p>
    <button
      on:click={async () => {
        currentState = state.LOADING;

        let formData = new FormData();
        try {
          const response = await fetch(image);
          const blob = await response.blob();
          const fileName = image.split("/").pop();
          const fileType = blob.type; // Dynamically determine the file type
          const file = new File([blob], fileName, { type: fileType });
          formData.append("url", image);
          formData.append("file", file);
          formData.append("userId", email); // Ensure this is appended after the file

          const postResponse = await fetch("http://0.0.0.0:8000/decodefile/", {
            method: "POST",
            body: formData,
          });
          if (!postResponse.ok) {
            currentState = state.ERROR;
            throw new Error("Failed to submit form");
          } else {
            currentState = state.SUCCESS;
            const scanButton = document.getElementById("scanButton");
            if (scanButton) {
              scanButton.innerHTML = "Found";
              scanButton.style.backgroundColor = "#FFCCCB";
            }
          }
          const data = await postResponse.json();
          console.log(data);
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      }}
      id="scanButton"
      class="btn btn-default"
      disabled={currentState === state.LOADING || currentState === state.ERROR}
      >{currentState === state.LOADING
        ? "Scanning..."
        : currentState === state.SUCCESS
          ? "Found!"
          : currentState === state.IDLE
            ? "Scan"
            : "None"}</button
    >
  </div>
</div>
<div class="divider"></div>
