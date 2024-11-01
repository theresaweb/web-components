const elementInternalsPolyfill = require('element-internals-polyfill'); //polyfill needed for iOS < 17
window.customElements.define(
	'newsletter-form',
	class newsletterForm extends HTMLElement {
		static formAssociated = true;

		constructor() {
			super();
			this.internals = this.attachInternals();
		}

		connectedCallback() {
			const shadow = this.attachShadow({ mode: 'open' });
			const style = document.createElement('style');
			style.textContent = `
				:host {
					display: block;
					margin: 1rem 0 0;
					padding: 22px 47px 22px;
					background: var(--stone);
				}
				@media (min-width: 992px) {
					:host {
						padding: 0;
						margin: 1rem 0 12px;
					}
				}
				.nl-inner-wrapper .nl-header {
					margin-bottom: 22px;
					display: grid;
					grid-template-columns: min-content auto auto;
					grid-template-areas:
						"img signup"
						"text text";
				}
				.nl-header .nl-img {
					margin-right: 20px;
					grid-area: img;
					color:  blue;
				}
				.nl-header .signup {
					grid-area: signup;
					font-size: 40px;
					font-weight: 700;
					color: var(--haymarket-blue);
				}
				.nl-header .nl-text {
					margin: 0;
					grid-area: text;
					color: var(--blue);
				}
				.nl-header.success {
					max-width: 660px;
					margin: 0 auto;
					grid-template-areas: 
						"img" 
						"signup"
						 "text";
					grid-template-columns: 1fr;
					text-align: center;
				}
				.nl-header.success .nl-img {
					margin: 0 auto;
				}
				.nl-header.success .signup {
					font-size: 22px;
				}
				.nl-header.success .nl-text {
					font-size: 18px;
				}
				.nl-inner-wrapper .nl-form {
					display: flex;
					flex-direction: column;
				}
				.nl-inner-wrapper .nl-form .error-message {
					flex-basis: 100%;
					background: #fbd6d7;
					color: #9f0e13;
					font-size: 1rem;
					padding: 5px 15px;
					margin-bottom: 15px;
					display: none;
				}
				.nl-inner-wrapper .policy-conditions {
					display: flex;
					justify-content: center;
					font-size: 10px;
				}
				.nl-inner-wrapper .policy-conditions .policy-link {
					font-size: 10px;
					color: var(--blue);
				}
				@media (min-width: 992px) {
					.nl-wrapper {
						background-image: url('/some.png');
						background-size: 100% auto;
						background-repeat: no-repeat;
						min-height: 435px;
						.nl-inner-wrapper {
							margin: 0 auto;
							padding-top: 72px;
							max-width: 924px;
							.nl-header {
								margin: 0 70px 20px;
								grid-template-areas: "img signup text";
								align-items: center;
								.signup {
									font-size: 50px;
									margin-right: 30px;
								}
								.nl-text {
									font-size: 27px;
									line-height: initial;
								}
								&.success {
									display: flex;
									flex-direction: column;
									margin: 0 auto;
									.signup {
										margin: 0 0 20px;
										font-size: 40px;
									}
									.nl-text {
										font-size: 21px;
									}
								}
							}
							.nl-form {
								flex-flow: row wrap;
								justify-content: space-between;
								& email-input {
									width: 48%;
								}
								& country-select {
									width: 48%;
								}
							}
							.policy-conditions {
								font-size: 14px;
								.policy-link {
									font-size: 12px;
								}
							}
						}
					}
				}
			`;
			this.shadowRoot.appendChild(style);
			shadow.innerHTML = `
			<div class='nl-wrapper'>
				<div class='nl-inner-wrapper'>
					<header class="nl-header">
						<img class="nl-img" width="70" height="70" src="/some.svg" alt="" />
						<span class="signup">Sign Up</span>
						<p class="nl-text">for the latest news, education, & treatment resource information</p>
					</header>
					<form class="nl-form" method="post" action="https://postman-echo.com/post">
						<input name="secnl" style="visibility:hidden;width:0;height:0" tabindex="-1" autocomplete="off">
						<div class="error-message"></div>
						<email-input></email-input>
						<newsletter-select></newsletter-select>
						<form-submit></form-submit>
					</form>
					<div class="policy-conditions"><a class="policy-link" href="/" target="_blank">Privacy Policy</a>  &nbsp;| &nbsp;<a class="policy-link" href="/" target="_blank">Terms &amp; Conditions</a></div>
				</div>
			</div>
			`;
			this.shadowRoot.appendChild(style);
		}
	},
);
