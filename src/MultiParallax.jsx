<div
  key={index}
  className={`parallax-section ${section.bgClass} relative flex items-center justify-center ${
    index === 0 ? 'h-screen pt-32' : 'h-screen'
  } text-white text-center px-4`}
>
  <div className="z-10" data-aos="fade-up">
    <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
      {section.heading}
    </h2>
    <p className="text-xl max-w-2xl mx-auto drop-shadow-md">{section.sub}</p>
  </div>
</div>
