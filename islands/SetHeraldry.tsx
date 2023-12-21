import { useComputed, useSignal } from "@preact/signals";
import Heraldry, {
  HeraldryCharge,
  HeraldryCommand,
  HeraldryDef,
  HeraldryDivision,
  HeraldryExtraCommand,
  HeraldryMetal,
  HeraldryOrdinary,
  HeraldryShape,
  HeraldryTincture,
} from "../components/Heraldry.tsx";
import Checkbox from "../components/Checkbox.tsx";
import ColorSelector from "../components/ColorSelector.tsx";
import CommandSelector from "../components/CommandSelector.tsx";
import ExtraCommandSelector from "../components/ExtraCommandSelector.tsx";
import ChargeSetter from "../components/ChargeSetter.tsx";
import ShapeSelector from "../components/ShapeSelector.tsx";

export default function SetHeraldry() {
  const shape = useSignal<HeraldryShape>("rounded");
  const field = useSignal<HeraldryMetal | HeraldryTincture>("or");

  const divisionEnabled = useSignal<boolean>(true);
  const divisionStyle = useSignal<HeraldryCommand>("bend");
  const divisionColor = useSignal<HeraldryMetal | HeraldryTincture>("gules");
  const divisionSecondary = useSignal<HeraldryMetal | HeraldryTincture>("or");
  const divisionSinister = useSignal<boolean>(true);
  const divisionPerverse = useSignal<boolean>(false);

  const ordinaryEnabled = useSignal<boolean>(false);
  const ordinaryStyle = useSignal<HeraldryCommand | HeraldryExtraCommand>(
    "fess",
  );
  const ordinaryColor = useSignal<HeraldryMetal | HeraldryTincture>("or");
  const ordinarySinister = useSignal<boolean>(false);
  const ordinaryPerverse = useSignal<boolean>(false);

  const division = useComputed<HeraldryDivision>(() => {
    return {
      command: divisionStyle.value,
      color: divisionColor.value,
      secondary: divisionSecondary.value,
      sinister: divisionSinister.value,
      perverse: divisionPerverse.value,
    };
  });

  const ordinary = useComputed<HeraldryOrdinary>(() => {
    return {
      command: ordinaryStyle.value,
      color: ordinaryColor.value,
      sinister: ordinarySinister.value,
      perverse: ordinaryPerverse.value,
    };
  });

  const charges = useSignal<HeraldryCharge[]>([{
    type: "square",
    color: "gules",
    arrangement: "fess",
    sinister: false,
    count: 1,
    rotation: 0,
    offset: {
      major: 0,
      minor: 0,
    },
  }]);

  const heraldry = useComputed<HeraldryDef>(() => {
    return {
      shape: shape.value,
      field: field.value,
      division: divisionEnabled.value ? division.value : undefined,
      ordinary: ordinaryEnabled.value ? ordinary.value : undefined,
      charges: charges.value,
    };
  });

  return (
    <div class="flex flex-col gap-2 w-full">
      <div class="flex flex-row justify-between">
        <div class="w-1/2">
          <div>
            <h2 class="text-xl">Shape</h2>
            <ShapeSelector
              containerProps={{ class: "flex flex-row items-center gap-4" }}
              labelProps={{
                children: "Shape:",
                class: "min-w-[5rem] inline-block",
              }}
              value={shape}
            />
          </div>
          <div>
            <h2 class="text-xl">Field</h2>
            <ColorSelector
              containerProps={{ class: "flex flex-row items-center gap-4" }}
              labelProps={{
                children: "Color:",
                class: "min-w-[5rem] inline-block",
              }}
              value={field}
            />
          </div>
          <div class="w-full">
            <h2 class="text-xl">Division</h2>
            <div class="flex flex-col gap-1">
              <div class="w-full flex flex-row items-center gap-4">
                <div class="min-w-[5rem]">
                  <label>Enabled:</label>
                </div>
                <div>
                  <Checkbox
                    checked={divisionEnabled.value}
                    onChange={(
                      e,
                    ) => (divisionEnabled.value = e.currentTarget.checked)}
                  />
                </div>
              </div>
              {divisionEnabled.value && (
                <>
                  <CommandSelector
                    containerProps={{
                      class: "flex flex-row items-center gap-4",
                    }}
                    labelProps={{
                      children: "Style:",
                      class: "min-w-[5rem] inline-block",
                    }}
                    value={divisionStyle}
                  />
                  <ColorSelector
                    containerProps={{
                      class: "flex flex-row items-center gap-4",
                    }}
                    labelProps={{
                      children: "Color:",
                      class: "min-w-[5rem] inline-block",
                    }}
                    value={divisionColor}
                  />
                  {divisionStyle.value === "pall" &&
                    (
                      <ColorSelector
                        containerProps={{
                          class: "flex flex-row items-center gap-4",
                        }}
                        labelProps={{
                          children: "Secondary:",
                          class: "min-w-[5rem] inline-block",
                        }}
                        value={divisionSecondary}
                      />
                    )}
                  {divisionStyle.value === "bend" && (
                    <div class="w-full flex flex-row items-center gap-4">
                      <div class="min-w-[5rem]">
                        <label>Sinister:</label>
                      </div>
                      <div>
                        <Checkbox
                          checked={divisionSinister.value}
                          onChange={(
                            e,
                          ) => (divisionSinister.value =
                            e.currentTarget.checked)}
                        />
                      </div>
                    </div>
                  )}
                  {(divisionStyle.value === "chevron" ||
                    divisionStyle.value === "pall") && (
                    <div class="w-full flex flex-row items-center gap-4">
                      <div class="min-w-[5rem]">
                        <label>Perverse:</label>
                      </div>
                      <div>
                        <Checkbox
                          checked={divisionPerverse.value}
                          onChange={(
                            e,
                          ) => (divisionPerverse.value =
                            e.currentTarget.checked)}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div class="w-full">
            <h2 class="text-xl">Ordinary</h2>
            <div class="flex flex-col gap-1">
              <div class="w-full flex flex-row items-center gap-4">
                <div class="min-w-[5rem]">
                  <label>Enabled:</label>
                </div>
                <div>
                  <Checkbox
                    checked={ordinaryEnabled.value}
                    onChange={(
                      e,
                    ) => (ordinaryEnabled.value = e.currentTarget.checked)}
                  />
                </div>
              </div>
              {ordinaryEnabled.value && (
                <>
                  <ExtraCommandSelector
                    containerProps={{
                      class: "flex flex-row items-center gap-4",
                    }}
                    labelProps={{
                      children: "Style:",
                      class: "min-w-[5rem] inline-block",
                    }}
                    value={ordinaryStyle}
                  />
                  <ColorSelector
                    containerProps={{
                      class: "flex flex-row items-center gap-4",
                    }}
                    labelProps={{
                      children: "Color:",
                      class: "min-w-[5rem] inline-block",
                    }}
                    value={ordinaryColor}
                  />
                  {(ordinaryStyle.value === "bend" ||
                    ordinaryStyle.value === "tierce" ||
                    ordinaryStyle.value === "canton") && (
                    <div class="w-full flex flex-row items-center gap-4">
                      <div class="min-w-[5rem]">
                        <label>Sinister:</label>
                      </div>
                      <div>
                        <Checkbox
                          checked={ordinarySinister.value}
                          onChange={(
                            e,
                          ) => (ordinarySinister.value =
                            e.currentTarget.checked)}
                        />
                      </div>
                    </div>
                  )}
                  {(ordinaryStyle.value === "chevron" ||
                    ordinaryStyle.value === "pall") && (
                    <div class="w-full flex flex-row items-center gap-4">
                      <div class="min-w-[5rem]">
                        <label>Perverse:</label>
                      </div>
                      <div>
                        <Checkbox
                          checked={ordinaryPerverse.value}
                          onChange={(
                            e,
                          ) => (ordinaryPerverse.value =
                            e.currentTarget.checked)}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <Heraldry class="w-1/2" heraldry={heraldry} id="heraldry" />
      </div>
      <ChargeSetter charges={charges} />
    </div>
  );
}
