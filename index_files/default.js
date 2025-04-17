window.addEventListener("load", function() {
	// header 要素の作成
	let hd = document.createElement("header");
	{
		let p = document.createElement("p");
		p.textContent = "情報メディア実験「Web コンテンツ作成」　" + themeTitle;
		hd.appendChild(p);
		let h1s = document.getElementsByTagName("h1");
		if (h1s && h1s.length > 0) {
			hd.appendChild(h1s[0]);
		}
		p = document.createElement("p");
		p.classList.add("mdn");
		hd.appendChild(p);
		let found = false;
		let cites = document.getElementsByTagName("cite");
		for (cite of cites) {
			if (cite.classList.contains("mdn")) {
				found = true;
				p.appendChild(cite);
			}
		}
	}
	// main と nav を横並びにするための div 要素作成
	let mainContent = document.createElement("div");
	mainContent.setAttribute("id", "main-content");
	
	// main 要素の作成・追加
	{
		let main = document.createElement("main");
		let cs = Array.from(document.body.childNodes);
		for (let c of cs) {
			main.appendChild(c);
		}
		mainContent.appendChild(main);
	}
	document.body.prepend(hd);
	document.body.append(mainContent);


	let urlParts = window.location.href.split('/');
	let fileName = urlParts.pop();
	let folderName = urlParts.pop();
	let fileNameIdx = fileName.indexOf('#');
	if (fileNameIdx >= 0) {
		fileName =fileName.substring(0, fileNameIdx);
	}

	// nav 要素作成準備
	// h2 要素のうち，練習問題と課題の見出しに id 属性を追加
	// nav 要素の作成・追加
	{
		let hs = document.querySelectorAll("h2, h3, h4, h5, h6");
		let cnt = 0;
		for (let h of hs) {
			let id=h.getAttribute('id');
			if (id === null || id === undefined) {
				h.setAttribute('id', '_midashi' + cnt + '_');
				cnt += 1;
			}
		}
	}
	
	let nav = document.createElement("nav");
	mainContent.appendChild(nav);

	{
		// 見出し一覧
		let div = document.createElement("div");
		div.classList.add("nav-content");
		div.classList.add("navhead");
		nav.appendChild(div);
		let p = document.createElement("p");
		p.textContent = "このページの見出し";
		div.appendChild(p);
		let ul = document.createElement("ul");
		div.appendChild(ul);
		let hs = document.querySelectorAll("h2, h3, h4, h5, h6");
		for (let h of hs) {
			let li = document.createElement("li");
			let a = makeLink("#"+h.getAttribute("id"), h.textContent);
			if (h.tagName.toLowerCase() !== 'h2') {
				li.classList.add('subsection');
			}
			li.appendChild(a);
			ul.appendChild(li);
		}
	}
	{	
		// 今回の資料一覧
		let div = document.createElement("div");
		div.classList.add("nav-content");
		div.classList.add("navfile");
		nav.appendChild(div);
		let p = document.createElement("p");
		p.textContent = themeTitle + ": ページ一覧";
		div.appendChild(p);
		let ul = document.createElement("ul");
		div.appendChild(ul);
		for (let f of files) {
			let li = document.createElement("li");
			let a = makeLink(f.fname, f.title);
			li.appendChild(a);
			if (f.fname === fileName) {
				li.classList.add("current");
			}
			ul.appendChild(li);
		}
	}
	{
		// このテーマのすべての資料
		let div = document.createElement("div");
		div.classList.add("nav-content");
		div.classList.add("navtext");
		nav.appendChild(div);
		let p = document.createElement("p");
		p.textContent = "「Webコンテンツ作成」の資料一覧";
		div.appendChild(p);
		let ul = document.createElement("ul");
		div.appendChild(ul);
		for (let t of texts) {
			let li = document.createElement("li");
			let a = makeLink(t.fname, t.title);
			li.appendChild(a);
			let fnameParts = t.fname.split('/');
			fnameParts.pop();
			let folder = fnameParts.pop();
			if (folder === folderName) {
				li.classList.add("current");
			}
			ul.appendChild(li);
		}
	}
		
	
	let idx = -1;
	for (let i=0; i<files.length; i++) {
		if (files[i].fname === fileName) {
			idx = i;
			break;
		}
	}
	
	if (idx >= 0) {
		let p = document.createElement("footer");
		document.body.appendChild(p);
		if (idx > 0) {
			//p.appendChild(makeLink(files[0].fname, "最初にもどる <<"));
			//p.appendChild(document.createTextNode("　｜　"));
			p.appendChild(makeLink(files[idx-1].fname, "前ページ「"+files[idx-1].title+"」 <"));
			p.appendChild(document.createTextNode("　｜　"));
		}
		if (idx < files.length-1) {
			p.appendChild(makeLink(files[idx+1].fname, "> 次ページ「"+files[idx+1].title+"」"));
		}
	}

	function makeLink(fname, txt) {
			let l = document.createElement("a");
			l.textContent = txt;
			l.setAttribute("href", fname);
			return l;
	}

	
	const links = document.links;
		
	for (let i = 0, linksLength = links.length; i < linksLength; i++) {
		if (links[i].hostname != window.location.hostname) {
			links[i].target = '_blank';
		} 
	}

	// アイコン設置
	{
		let cautions = document.getElementsByClassName('caution');
		for (let c of cautions) {
			let img = document.createElement("img");
			img.setAttribute("src", "../imgs/caution.png");
			img.classList.add("icon");
			c.prepend(img);
		}

		let infoes = document.getElementsByClassName('info');
		for (let c of infoes) {
			let img = document.createElement("img");
			img.setAttribute("src", "../imgs/info.png");
			img.classList.add("icon");
			c.prepend(img);
		}
		/*
		let practices = document.getElementsByClassName('practice');
		for (let c of practices) {
			let img = document.createElement("img");
			img.setAttribute("src", "../imgs/practice.png");
			img.classList.add("icon");
			c.prepend(img);
		}
		*/
	}

	// 画像のサイズをクラスで指定 & 画像クリックで拡大表示ページに移動
	{
		let imgs = document.getElementsByTagName('img');
		for (let i of imgs) {
			if (i.classList.contains("icon")) {
				continue;
			}
			let src = i.getAttribute('src');
			if (src.endsWith("sm.png")) {
				i.classList.add("sm");
			}
			else {
				i.classList.add("lg");
			}
			i.addEventListener('click', function() {
				window.open(src, '_blank');
			});
		}
	}
});
