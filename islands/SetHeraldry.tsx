import { Signal, useSignal } from "@preact/signals";
import Select from "../components/Select.tsx";
import Heraldry, { HeraldryCommand, HeraldryDef, HeraldryMetal, HeraldryTincture } from "../components/Heraldry.tsx";
import Checkbox from "../components/Checkbox.tsx";
import { Button } from "../components/Button.tsx";

export default function SetHeraldry() {
    const heraldry = useSignal<HeraldryDef>({ field: 'or', ordinary: { command: 'canton', color: 'gules', sinister: false }});
    return <div class="flex flex-col gap-2 w-full">
        <div class="flex flex-row justify-between">
            <div>
                <div>
                    <h2 class="text-xl">Field</h2>
                    <div class="flex flex-row gap-1 items-center">
                        <div class="min-w-[7rem]">
                            <label for="field-color">Color:</label>
                        </div>
                        <div>
                            <Select name="field-color" onChange={(e) => (heraldry.value = {
                                field: e.currentTarget.value as (HeraldryTincture | HeraldryMetal), 
                                division: heraldry.value.division,
                                ordinary: heraldry.value.ordinary,
                            })} value={heraldry.value.field}>
                                <option value="gules">Gules</option>
                                <option value="noir">Noir</option>
                                <option value="argent">Argent</option>
                                <option value="or">Or</option>
                            </Select>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 class="text-xl">Division</h2>
                    <div class="flex flex-col gap-1">
                        <div class="flex flex-row gap-1 items-center">
                            <div class="min-w-[7rem]">
                                <label for="division-enabled">Enabled:</label>
                            </div>
                            <div>
                                <Checkbox name="division-enabled" onChange={(e) => (heraldry.value = {
                                    field: heraldry.value.field,
                                    ordinary: heraldry.value.ordinary,
                                    division: e.currentTarget.checked ? { command: 'fess', color: 'gules' } : undefined
                                })} checked={heraldry.value.division !== undefined} />
                            </div>
                        </div>
                        {heraldry.value.division !== undefined && <><div class="flex flex-row gap-1 items-center">
                            <div class="min-w-[7rem]">
                                <label for="division-command">Style:</label>
                            </div>
                            <div>
                                <Select name="division-command" onChange={(e) => (heraldry.value = {
                                    field: heraldry.value.field, 
                                    ordinary: heraldry.value.ordinary,
                                    division: {
                                        color: heraldry.value.division?.color ?? 'gules',
                                        secondary: heraldry.value.division?.secondary ?? 'gules',
                                        command: e.currentTarget.value as HeraldryCommand,
                                    }
                                })} value={heraldry.value.division?.command ?? 'fess'} >
                                    <option value="fess">Fess</option>
                                    <option value="pale">Pale</option>
                                    <option value="bend">Bend</option>
                                    <option value="cross">Cross</option>
                                    <option value="saltire">Saltire</option>
                                    <option value="chevron">Chevron</option>
                                    <option value="pall">Pall</option>
                                </Select>
                            </div>
                        </div>
                        <div class="flex flex-row gap-1 items-center">
                            <div class="min-w-[7rem]">
                            <label for="division-color">Color:</label>
                            </div>
                            <div>
                                <Select name="division-color" onChange={(e) => (heraldry.value = {
                                    field: heraldry.value.field, 
                                    ordinary: heraldry.value.ordinary,
                                    division: {
                                        color: e.currentTarget.value as (HeraldryMetal | HeraldryTincture),
                                        command: heraldry.value.division?.command ?? 'fess',
                                    }
                                })} value={heraldry.value.division?.color ?? 'gules'} >
                                    <option value="gules">Gules</option>
                                    <option value="noir">Noir</option>
                                    <option value="argent">Argent</option>
                                    <option value="or">Or</option>
                                </Select>
                            </div>
                        </div></>}
                        {heraldry.value.division?.command === 'pall' && <div class="flex flex-row gap-1 items-center">
                            <div class="min-w-[7rem]">
                            <label for="division-secondary">Secondary:</label>
                            </div>
                            <div>
                                <Select name="division-secondary" onChange={(e) => (heraldry.value = {
                                    field: heraldry.value.field,
                                    ordinary: heraldry.value.ordinary, 
                                    division: {
                                        color: heraldry.value.division?.color ?? 'gules',
                                        secondary: e.currentTarget.value as (HeraldryMetal | HeraldryTincture),
                                        command: heraldry.value.division?.command ?? 'fess',
                                        perverse: heraldry.value.division?.perverse ?? false
                                    }
                                })} value={heraldry.value.division?.secondary ?? 'gules'} >
                                    <option value="gules">Gules</option>
                                    <option value="noir">Noir</option>
                                    <option value="argent">Argent</option>
                                    <option value="or">Or</option>
                                </Select>
                            </div>
                        </div>}
                        {heraldry.value.division?.command == 'bend' && <div class="flex flex-row gap-1 items-center">
                            <div class="min-w-[7rem]">
                                <label for="division-sinister">Sinister:</label>
                            </div>
                            <div>
                                <Checkbox name="division-sinister" onChange={(e) => (heraldry.value = {
                                    field: heraldry.value.field,
                                    ordinary: heraldry.value.ordinary,
                                    division: {
                                        command: heraldry.value.division?.command ?? 'fess',
                                        color: heraldry.value.division?.color ?? 'gules',
                                        sinister: e.currentTarget.checked
                                    }
                                })} checked={heraldry.value.division?.sinister ?? false} />
                            </div>
                        </div>}
                        {(heraldry.value.division?.command == 'chevron' || heraldry.value.division?.command == 'pall') && <div class="flex flex-row gap-1 items-center">
                            <div class="min-w-[7rem]">
                                <label for="division-perverse">Perverse:</label>
                            </div>
                            <div>
                                <Checkbox name="division-perverse" onChange={(e) => (heraldry.value = {
                                    field: heraldry.value.field,
                                    ordinary: heraldry.value.ordinary,
                                    division: {
                                        command: heraldry.value.division?.command ?? 'fess',
                                        color: heraldry.value.division?.color ?? 'gules',
                                        secondary: heraldry.value.division?.secondary ?? 'gules',
                                        perverse: e.currentTarget.checked
                                    }
                                })} checked={heraldry.value.division?.perverse ?? false} />
                            </div>
                        </div>}
                    </div>
                </div>
                <div>
                    <h2 class="text-xl">Ordinary</h2>
                    <div class="flex flex-col gap-1">
                    <div class="flex flex-row gap-1 items-center">
                            <div class="min-w-[7rem]">
                                <label for="ordinary-enabled">Enabled:</label>
                            </div>
                            <div>
                                <Checkbox name="ordinary-enabled" onChange={(e) => (heraldry.value = {
                                    field: heraldry.value.field,
                                    division: heraldry.value.division,
                                    ordinary: e.currentTarget.checked ? { command: 'fess', color: 'gules' } : undefined
                                })} checked={heraldry.value.ordinary !== undefined} />
                            </div>
                        </div>
                        {heraldry.value.ordinary !== undefined && <><div class="flex flex-row gap-1 items-center">
                            <div class="min-w-[7rem]">
                                <label for="ordinary-command">Style:</label>
                            </div>
                            <div>
                                <Select name="ordinary-command" onChange={(e) => (heraldry.value = {
                                    field: heraldry.value.field,
                                    division: heraldry.value.division,
                                    ordinary: {
                                        color: heraldry.value.ordinary?.color ?? 'gules',
                                        command: e.currentTarget.value as HeraldryCommand,
                                        perverse: heraldry.value.ordinary?.perverse,
                                        sinister: heraldry.value.ordinary?.sinister,
                                    }
                                })} value={heraldry.value.ordinary?.command ?? 'fess'} >
                                    <option value="fess">Fess</option>
                                    <option value="pale">Pale</option>
                                    <option value="bend">Bend</option>
                                    <option value="cross">Cross</option>
                                    <option value="saltire">Saltire</option>
                                    <option value="chevron">Chevron</option>
                                    <option value="pall">Pall</option>
                                    <option value="chief">Chief</option>
                                    <option value="base">Base</option>
                                    <option value="tierce">Tierce</option>
                                    <option value="canton">Canton</option>
                                </Select>
                            </div>
                        </div>
                        <div class="flex flex-row gap-1 items-center">
                            <div class="min-w-[7rem]">
                            <label for="ordinary-color">Color:</label>
                            </div>
                            <div>
                                <Select name="ordinary-color" onChange={(e) => (heraldry.value = {
                                    field: heraldry.value.field,
                                    division: heraldry.value.division,
                                    ordinary: {
                                        color: e.currentTarget.value as (HeraldryMetal | HeraldryTincture),
                                        command: heraldry.value.ordinary?.command ?? 'fess',
                                        perverse: heraldry.value.ordinary?.perverse,
                                        sinister: heraldry.value.ordinary?.sinister,
                                    }
                                })} value={heraldry.value.ordinary?.color ?? 'gules'} >
                                    <option value="gules">Gules</option>
                                    <option value="noir">Noir</option>
                                    <option value="argent">Argent</option>
                                    <option value="or">Or</option>
                                </Select>
                            </div>
                        </div></>}
                        {(heraldry.value.ordinary?.command === 'bend' || heraldry.value.ordinary?.command === 'tierce' || heraldry.value.ordinary?.command === 'canton' ) && <div class="flex flex-row gap-1 items-center">
                            <div class="min-w-[7rem]">
                                <label for="ordinary-sinister">Sinister:</label>
                            </div>
                            <div>
                                <Checkbox name="ordinary-sinister" onChange={(e) => (heraldry.value = {
                                    field: heraldry.value.field,
                                    division: heraldry.value.division,
                                    ordinary: {
                                        command: heraldry.value.ordinary?.command ?? 'fess',
                                        color: heraldry.value.ordinary?.color ?? 'gules',
                                        perverse: heraldry.value.ordinary?.perverse,
                                        sinister: e.currentTarget.checked
                                    }
                                })} checked={heraldry.value.ordinary?.sinister ?? false} />
                            </div>
                        </div>}
                        {(heraldry.value.ordinary?.command === 'chevron' || heraldry.value.ordinary?.command === 'pall') && <div class="flex flex-row gap-1 items-center">
                            <div class="min-w-[7rem]">
                                <label for="ordinary-perverse">Perverse:</label>
                            </div>
                            <div>
                                <Checkbox name="ordinary-perverse" onChange={(e) => (heraldry.value = {
                                    field: heraldry.value.field,
                                    division: heraldry.value.division,
                                    ordinary: {
                                        command: heraldry.value.ordinary?.command ?? 'fess',
                                        color: heraldry.value.ordinary?.color ?? 'gules',
                                        sinister: heraldry.value.ordinary?.sinister,
                                        perverse: e.currentTarget.checked
                                    }
                                })} checked={heraldry.value.ordinary?.perverse ?? false} />
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
            <Heraldry class="w-1/2" heraldry={heraldry} id="heraldry" />
        </div>
    </div>
}
