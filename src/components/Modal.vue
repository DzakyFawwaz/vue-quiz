<template>
  <!-- <div v-if="isVisible" class="modal-wrapper">
    <div class="modal-sub-wrapper">
      <div class="modal-container">ini modal</div>
    </div>
    <button
      class="text-white btn custom-btn"
      @click="$props.show = false"
      v-on:click="closeModal"
    >
      Close
    </button>
  </div>
  <div v-else></div> -->
  <div>
    <button
      type="button"
      class="btn mpa-btn-primary custom-button text-white"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
      v-on:click="modalIsOpen"
    >
      Launch demo modal
    </button>

    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              class="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* .active {
  display: none;
} */

.modal-wrapper {
  /* display: none; */
  z-index: 100;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100vh;
}

.modal-sub-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  background-color: white;
}
</style>
