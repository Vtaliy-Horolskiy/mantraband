if (!customElements.get('tabs-collection')) {
    class tabsCollection extends HTMLElement {
        constructor() {
            super();
            this.buttons = this.querySelectorAll('.collection-titles__link');
            this.tabsContent = this.querySelectorAll('.collection-content__item');

            this.buttons.forEach( button => {
                button.addEventListener('click', (e) => {
                    this.optionsButton(button, e);
                })
            });

        }

        optionsButton(target, e) {
            this.buttonAttribute = target.getAttribute('data-content-id');
            this.tabContent = document.getElementById(this.buttonAttribute);
            if(this.tabContent){
                e.preventDefault();
                this.removeSelected(this.buttons);
                this.removeSelected(this.tabsContent);
                this.tabContent.setAttribute('aria-selected', 'true');
                target.setAttribute('aria-selected', 'true');
            }
        }

        removeSelected(target) {
            target.forEach( item => {
                item.setAttribute('aria-selected', 'false');
            })
        }

    }

    customElements.define('tabs-collection', tabsCollection);
}
