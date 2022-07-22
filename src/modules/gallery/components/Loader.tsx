import Image from 'next/image'

const Loader = () => {
  return (
    <div className="col-span-3 mt-8 mb-16 flex flex-col items-center">
      <Image
        src="/images/onsplash.png"
        width={40}
        height={40}
        alt="Onsplash logo"
      />
      <p className="text-primary pt-2 relative">
        Make some{' '}
        <span className="absolute -top-1 -ml-4 -rotate-6 line-through">
          awesome
        </span>
        interesting.
      </p>
    </div>
  )
}

export default Loader
