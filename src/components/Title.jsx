export const Title = () => {
  return (
    <nav class="navbar navbar-light navbar-expand-lg bg-light fixed-top">
      <a class="navbar-brand" href="#">
        Offcanvas navbar
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#navbarOffcanvasLg"
        aria-controls="navbarOffcanvasLg"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="navbarOffcanvasLg"
        aria-labelledby="navbarOffcanvasLgLabel"
      >
        <div
          class="offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvas"
          aria-labelledby="offcanvasLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasLabel">
              Offcanvas
            </h5>
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            Content for the offcanvas goes here. You can place just about any
            Bootstrap component or custom elements here.
          </div>
        </div>
      </div>
    </nav>
  );
};
