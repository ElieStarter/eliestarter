import monogram from "../EL_el svg.svg";
import wordmark from "../eliestudio.svg";

const PresentationBrand = ({ toolLogo, toolName }) => (
  <div className="flex items-center gap-3 sm:gap-4">
    <svg viewBox="388 94 504 504" className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" aria-hidden="true">
      <image href={monogram} width="1280" height="800" className="brightness-0 invert" />
    </svg>
    <span aria-hidden="true" className="h-8 w-px shrink-0 bg-[#21c7a8]/65" />
    <img
      src={wordmark}
      alt="ElieStudio"
      width={1008}
      height={271}
      className="h-auto w-36 min-w-0 brightness-0 invert sm:w-44 lg:w-52"
    />
    {toolLogo && (
      <img
        src={toolLogo}
        alt={toolName}
        width={48}
        height={48}
        className="ml-1 h-9 w-9 shrink-0 object-contain sm:ml-2 sm:h-12 sm:w-12"
      />
    )}
  </div>
);

export default PresentationBrand;
