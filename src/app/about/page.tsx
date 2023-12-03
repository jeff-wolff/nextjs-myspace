import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About NextSpace',
};

export default function Blog() {
  return (
    <div>
      <h1>About Us</h1>
      <p><strong>NextSpace is an online community that lets you meet your friends' friends.</strong></p>
      <p>We are a social media company that wants to bring people together!</p>
      <p>Create a community on NextSpace with your growing network of mutual friends!</p>
      <br />
      <p className='primary-color'><strong>NextSpace is for everyone:</strong></p>
      <ul className='rte'>
        <li>Friends who want to talk Online</li>
        <li>Single people who want to meet other Singles</li>
        <li>Matchmakers who want to connect their friends with other friends</li>
        <li>Families who want to keep in touch--map your Family Tree</li>
        <li>Business people and co-workers interested in networking</li>
        <li>Classmates and study partners</li>
        <li>Anyone looking for long lost friends!</li>
      </ul>
      <br />
      <p>We are a new site, developing new features as fast as we can.</p>
    </div>
  );
}