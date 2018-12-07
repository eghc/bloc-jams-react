import React from 'react';
import Typography from '@material-ui/core/Typography';


const Landing = () => (
  <section className = "landing">
    <Typography component="h2" variant="display3" color='primary' gutterBottom>
         Turn the music up!
    </Typography>
    <section className ="selling-points">
      <div className="point">
        <Typography component="h2" variant="display1" gutterBottom>Choose your music</Typography>
        <Typography variant="body1" gutterBottom>The world is full of music; why should you have to listen to music that someone else chose?</Typography>
      </div>
      <div className="point">
      <Typography component="h2" variant="display1" gutterBottom>Unlimited, streaming, ad-free</Typography>
        <Typography variant="body1" gutterBottom>No arbitrary limits. No distractions.</Typography>
      </div>
      <div className="point">
      <Typography component="h2" variant="display1" gutterBottom>Mobile Enabled</Typography>
      <Typography variant="body1" gutterBottom>Listen to your music on the go. This streaming service is available on all mobile platforms.</Typography>
      </div>
    </section>
  </section>
);


export default Landing;
