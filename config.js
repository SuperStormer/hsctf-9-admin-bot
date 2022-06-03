const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

const challenges = new Map([
	[
		[
			"markdown-plus-plus",
			{
				title: "Submit Page",
				header: "Show us what you've created!",
				timeout: 10 * 1000,
				urlRegex: /^https:\/\/localhost:8000\//, //FIXME
				handler: async function (url, ctx) {
					const URL = "https://localhost:8000/"; //FIXME
					const FLAG = "flag{waterfall}";

					let page = await ctx.newPage();
					await page.goto(`${URL}/create`);
					await (await page.querySelector("#login-form > [name=username]")).type(FLAG);
					await (await page.querySelector("#login-form > [type=submit]")).click();
					await page.waitForNavigation();
					await page.close();
					page = await ctx.newPage();
					await page.goto(url, { timeout: 3000, waitUntil: "domcontentloaded" });
					await sleep(3000);
					await page.close();
				},
			},
		],
		[
			"hsgtf",
			{
				title: "Report",
				header: "Report Error to Admin",
				timeout: 50 * 1000,
				handler: async function (url, ctx) {
					const DOMAIN = "localhost"; // FIXME
					const ADMIN_SECRET =
						"003db352756e870182e7360ed9d1bb3df2add8989374927a42ef39688c89304d";
					let page = await ctx.newPage();
					page.setCookies({
						name: "secret",
						value: ADMIN_SECRET,
						domain: DOMAIN,
						httpOnly: true,
						secure: true,
						sameSite: "None",
					});
					await page.goto(url, { timeout: 3000, waitUntil: "domcontentloaded" });
					await sleep(40 * 1000);
					await page.close();
				},
			},
		],
	],
]);
export default {
	challenges,
};
