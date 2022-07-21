import { AcademicCapIcon } from '@heroicons/react/solid'

const Loader = () => {
  return (
    <div className="col-span-3 mt-8 mb-16 flex flex-col items-center">
      <AcademicCapIcon className="w-12 h-12" />
      <p className="text-primary pt-2 relative">
        Make some{' '}
        <span className="absolute -top-2 -ml-4 -rotate-6 line-through">
          awesome
        </span>
        interesting.
      </p>
    </div>
  )
}

export default Loader
