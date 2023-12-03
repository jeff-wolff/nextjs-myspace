'use client';

import styles from './ProfileForm.module.css';

export function ProfileForm({ user }: any) {

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);

    const body = {
      name: formData.get('name'),
      bio: formData.get('bio'),
      age: formData.get('age'),
      image: formData.get('image'),
    };

    const res = await fetch('/api/user', {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    await res.json();
  };

  return (
    <div>
      <h2>Edit Your Profile</h2>
      <div className={styles.profile}>
        <div className={`${styles.callout} callout`}>
          <p>You may enter HTML or CSS in the About Me text field.</p>
          <p>Javascript is not allowed. Do not use HTML/CSS to cover NextSpace advertisements.</p>
          <p>To disable clickable links, put a &lt;Z&gt; anywhere in the box.</p>
        </div>
        <form onSubmit={updateUser} className={styles.profileForm}>
          <div>
            <label></label>
            <button type="submit">Save All Changes</button>
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" defaultValue={user?.name ?? ''} />
          </div>
          <div>
            <label htmlFor="bio">About Me:</label>
            <textarea
              name="bio"
              cols={30}
              rows={10}
              defaultValue={user?.bio ?? ''}
              style={{
                resize: 'vertical',            
              }}
            ></textarea>
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input type="number" name="age" defaultValue={user?.age ?? 0} />
          </div>
          <div>
            <label htmlFor="image">Profile Image URL:</label>
            <input type="url" name="image" defaultValue={user?.image ?? ''} />
          </div>

          <div>
            <label></label>
            <button type="submit">Save All Changes</button>
          </div>

        </form>
      </div>
    </div>
  );
}