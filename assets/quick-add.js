if (!customElements.get('quick-add')) {
    class QuickAdd extends HTMLElement {
        constructor() {
            super();
            this.button = this.querySelector("button");
            this.variantId = this.dataset.variantId;

            if (this.button) {
                this.button.addEventListener("click", (e) => this.onClick(e));
            }
        }

        async onClick(e) {
            e.preventDefault();
            if (!this.variantId) return;

            this.setLoading(true);

            try {
                await this.addToCart(this.variantId);
                this.setAddedState();
            } catch (error) {
                console.error("Quick Add Error:", error);
                this.setLoading(false);
            }
        }

        addToCart(variantId) {
            return fetch("/cart/add.js", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: variantId, quantity: 1})
            });
        }

        setLoading(state) {
            this.button.disabled = state;
        }

        setAddedState() {
            this.button.disabled = true;
        }
    }

    customElements.define("quick-add", QuickAdd);
}
