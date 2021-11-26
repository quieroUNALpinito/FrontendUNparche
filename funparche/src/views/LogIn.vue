<template>
  <div class="p-grid p-ai-center vertical-container">
    <div class="p-col">
      <Button
        type="button"
        label="Log In"
        style="width: 20rem"
        class="p-d-block p-mx-auto"
      />
      <p></p>
      <Button
        type="button"
        label="Sign In"
        style="width: 20rem"
        class="p-d-block p-mx-auto"
      />
      <p></p>
      <InlineMessage
        severity="info"
        style="width: 20rem"
        class="p-d-block p-mx-auto"
        >Recuerde usar su cuenta UNAL</InlineMessage
      >
    </div>
    <div class="p-col">
      <img src="../assets/logo.svg" class="p-m-6 p-p-6" />
    </div>
  </div>
</template>
