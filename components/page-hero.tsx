import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  imageAlt: string;
  creditUrl: string;
};

export function PageHero({eyebrow,title,copy,image,imageAlt,creditUrl}:PageHeroProps){return <section className="page-hero"><Image className="page-hero-image" src={image} alt={imageAlt} fill priority sizes="100vw"/><div className="page-hero-overlay"/><div className="shell page-hero-content"><p className="eyebrow light">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div><a className="photo-credit" href={creditUrl} target="_blank" rel="noreferrer">Photo · Unsplash</a></section>}
