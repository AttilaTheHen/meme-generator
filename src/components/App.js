import React, { Component } from 'react';
import styles from './App.css';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';

class App extends Component {
  state = {
    topText: 'this is where',
    bottomText: 'the fun begins',
    url: 'http://i.imgflip.com/1be86b.jpg'
  };

  handleTopTextChange = (topText = '') => {
    this.setState({ topText });
  };

  handleBottomTextChange = (bottomText = '') => {
    this.setState({ bottomText });
  };

  handleBackgroundChoose = (url = '') => {
    this.setState({ url });
  };

  handleExport = () => {
    dom2image.toBlob(this.image)
      .then(blob => {
        fileSaver.saveAs(blob, 'dank-meme.png');
      });
  };

  render() {
    const { url, topText, bottomText } = this.state;

    return (
      <main className={styles.app}>
        <section>
          <h1>Meme Generator</h1>
          <MemeText label='Top' content={topText} onChange={this.handletopTextChange}/>
          <MemeText label='Bottom' content={bottomText} onChange={this.handlebottomTextChange}/>
          <Background url={url} onChoose={this.handleBackgroundChoose}/>
        </section>

        <section className='dank-meme'>
          <h2>Here Be Your Dank Meme</h2>
          <section ref={node => this.image = node}>
            <AddText topText={topText} bottomText={bottomText} url={url}/>
          </section>
          <p>
            <button onClick={this.handleExport}>Save meme</button>
          </p>
        </section>
      </main>
    );
  }
}

function MemeText({ content, onChange, label }) {
  return (
    <p>
      <label>
        {label} Text:
        <input
          value={content}
          onChange={({ target }) => onChange(target.value)}
        />
      </label>
    </p>
  );
}

function AddText({ url, topText, bottomText }) {
  return (
    <div style={{ background: `url(${url}) no-repeat center / auto 500px` }}>
      <h3 id='top'>{topText}</h3>
      <h3 id='bottom'>{bottomText}</h3>
    </div>
  );
}

function Background({ url, onChoose }) {
  return (
    <label>
      Background image:
      <input value={url} onChange={({ target }) => onChoose(target.value)}/>
      <input type="file" onChange={({ target }) => {
        const reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.onload = () => onChoose(reader.result);
      }}/>
    </label>
  );
}

export default App;