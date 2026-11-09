export function VehicleArt({ kind }: { kind: string }) {
  const suv = kind === "SUV";
  const van = kind === "Group vehicle";
  return (
    <div className="vehicle-art" aria-hidden="true">
      <svg viewBox="0 0 360 190" fill="none" className="vehicle-svg">
        <ellipse
          cx="180"
          cy="158"
          rx="137"
          ry="9"
          fill="#93b0c3"
          opacity=".22"
        />
        <path
          d={
            van
              ? "M43 128V70Q43 54 60 54H249Q267 54 278 77L300 124V144H43Z"
              : suv
                ? "M37 127L48 96Q52 86 71 84L102 54H233L263 91L311 107L322 140H36Z"
                : "M32 129L50 105L104 91L142 62H225L265 99L311 111L329 139H30Z"
          }
          fill={suv ? "#537d96" : van ? "#dce5eb" : "#a8bac6"}
          stroke="#4a6677"
          strokeWidth="2"
        />
        <path
          d={
            van
              ? "M68 65H120V103H68ZM133 65H184V103H133ZM198 65H245L263 103H198Z"
              : suv
                ? "M111 65H159V93H84ZM171 65H227L251 93H171Z"
                : "M149 72H177V99H116ZM188 72H219L250 99H188Z"
          }
          fill="#284556"
        />
        <path
          d="M44 123H310M165 105V137M212 106H229"
          stroke="#5b7686"
          strokeWidth="2"
        />
        <path d="M38 127H62M297 121H316" stroke="#f5f8e8" strokeWidth="7" />
        <path d="M35 144H323" stroke="#3b5362" strokeWidth="7" />
        <circle cx="95" cy="142" r="25" fill="#223644" />
        <circle cx="95" cy="142" r="15" fill="#c2ced6" />
        <circle cx="95" cy="142" r="8" fill="#5f7786" />
        <circle cx="268" cy="142" r="25" fill="#223644" />
        <circle cx="268" cy="142" r="15" fill="#c2ced6" />
        <circle cx="268" cy="142" r="8" fill="#5f7786" />
      </svg>
    </div>
  );
}
