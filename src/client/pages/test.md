---
title: Test
slug: test
layout: test
---
<section style="padding: 1rem;">
  <header>
    <h2>Form</h2>
  </header>
  <form action="#">
    <fieldset>
      <legend>Form legend</legend>
      <div>
        <label for="f1">Text input:</label>
        <input type="text" id="f1" value="input text" required>
      </div>
      <div>
        <label for="pw">Password input:</label>
        <input type="password" id="pw" value="password">
      </div>
      <div>
        <input type="radio" id="f2">
        <label for="f2">Radio input</label>
      </div>
      <div>
        <input type="checkbox" id="f3">
        <label for="f3">Checkbox input</label>
      </div>
      <div>
        <label for="f4">Select field:</label>
        <select id="f4">
          <option>
            Option 01
          </option>
          <option>
            Option 02
          </option>
        </select>
      </div>
      <div>
        <label for="f5">Textarea:</label>
        <textarea id="f5" rows="5">Textarea text</textarea>
      </div>
      <div>
        <label for="f6">Input Button:</label>
        <input type="button" id="f6" value="button text">
      </div>
      <div>
        <label>Button Elements: <span class="small quiet">Can use &lt;button&gt; tag or &lt;a class="button"&gt;</span></label>
        <button class="button positive"><img src="https://raw.githubusercontent.com/ericrasch/html-kitchen-sink/master/web/assets/img/icons/tick.png" alt=""> Save</button> <a class="button" href="#"><img src="https://raw.githubusercontent.com/ericrasch/html-kitchen-sink/master/web/assets/img/icons/key.png" alt=""> Change Password</a> <a href="#" class="button negative"><img src="https://raw.githubusercontent.com/ericrasch/html-kitchen-sink/master/web/assets/img/icons/cross.png" alt=""> Cancel</a>
      </div>
    </fieldset>
  </form>
</section>
<!--<section style="padding: 1rem;">
  <header>
    <h2>Base Elements</h2>
  </header>
  <ul class="elements">
    <li><a href="#">a</a></li>
    <li><p><abbr title="JavaScript Object Notation">JSON</abbr> (<dfn title="JSON">JavaScript Object Notation</dfn>) is a lightweight data-interchange format.</p></li>
    <li><acronym>acronym</acronym></li>
    <li><audio>audio</audio></li>
    <li><b>b</b></li>
    <li><big>big</big></li>
    <li><button>Button</button></li>
    <li><button type="button">Type Button</button></li>
    <li><button type="submit">Type Submit</button></li>
    <li><button type="reset">Type Reset</button></li>
    <li><button disabled>Disabled</button></li>
    <li><caption>caption</caption></li>
    <li><code>code</code></li>
    <li><details>
        <summary>summary</summary>
        details
      </details>
    </li>
    <li><em>em</em></li>
    <li><embed>embed</embed></li>
    <li>
      <h1>h1</h1>
      <h2>h2</h2>
      <h3>h3</h3>
      <h4>h4</h4>
      <h5>h5</h5>
      <h6>h6</h6>
    </li>
    <li><hr /></li>
    <li><i>i</i></li>
    <li><kbd>kbd</kbd></li>
    <li>
      <ul>
        <li>ul</li>
        <li>ul</li>
        <li>ul
          <ul>
            <li>ul</li>
            <li>ul</li>
            <li>ul</li>
          </ul></li>
      </ul>
    </li>
    <li>
      <ol>
        <li>ol</li>
        <li>ol</li>
        <li>ol
          <ol>
            <li>ol</li>
            <li>ol</li>
            <li>ol</li>
          </ol></li>
      </ol>
    </li>
    <li>
      <dl>
        <dt>dt</dt>
        <dd>dd</dd>
        <dd>dd
          <dl>
            <dt>dt</dt>
            <dd>dd</dd>
            <dd>dd</dd>
          </dl></dd>
      </dl>
    </li>
    <li>
      <nav>
        <ul class="navigation-list">
          <li><a href="#">Nav 1</a></li>
          <li><a href="#">Nav 2</a></li>
          <li><a href="#">Nav 3</a></li>
        </ul>
      </nav>
    </li>
    <li><object>object</object></li>
    <li><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.</p></li>
    <li><pre>pre Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.</pre></li>
    <li><pre><code>function greet(greeting) {
  console.log(greeting)
}</code></pre></li>
    <li><progress value="1" max="2"></li>
    <li><q>q</q></li>
    <li><p><q>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.</q></p></li>
    <li><samp>samp</samp></li>
    <li><small>small</small></li>
    <li><strong>strong</strong></li>
    <li><sub>sub</sub></li>
    <li><sup>sup</sup></li>
    <li><var>var</var></li>
  </ul>
</section>-->
<!--<section style="padding: 1rem;">
  <header>
    <h2>Components</h2>
  </header>
  <ul class="components">
    <li><img class="avatar" src="https://source.unsplash.com/random/500x500" alt=""></li>
    <li><img class="avatar avatar_small" src="https://source.unsplash.com/random/500x500" alt=""></li>
    <li><img class="avatar avatar_large" src="https://source.unsplash.com/random/500x500" alt=""></li>
    <li>
      <nav>
        <ul class="breadcrumb">
          <li><a href="#">Lorum ipsum dolor sit amet</a></li>
          <li><a href="#">This is another pretty long one</a></li>
          <li><a href="#" aria-current="page">This breadcrumb navigation item is pretty long</a></li>
        </ul>
      </nav>
    </li>
    <li><a class="button" href="#">Hyperlink button</a></li>
    <li><button class="button">Button</button></li>
    <li><button class="button" type="button">Type Button</button></li>
    <li><button class="button" type="submit">Type Submit</button></li>
    <li><button class="button" type="reset">Type Reset</button></li>
    <li><button class="button" disabled>Disabled</button></li>
  </ul>
</section>-->