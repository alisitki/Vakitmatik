"use client";

import React, { useState, useEffect } from "react";
import { MEDUSAE_DEFAULTS, type MedusaeConfig } from "@/config/medusaeConfig";

type ParticleSettingsProps = {
    config: MedusaeConfig;
    onChange: (newConfig: MedusaeConfig) => void;
};

export function ParticleSettings({ config, onChange }: ParticleSettingsProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSliderChange = (
        category: keyof MedusaeConfig,
        field: string,
        value: number
    ) => {
        const newConfig = {
            ...config,
            [category]: {
                ...(config[category] as any),
                [field]: value,
            },
        };
        onChange(newConfig);
    };

    const handleColorChange = (
        field: string,
        value: string
    ) => {
        const newConfig = {
            ...config,
            particles: {
                ...config.particles,
                [field]: value,
            },
        };
        onChange(newConfig);
    };

    const handleDeviceColorChange = (
        field: keyof MedusaeConfig["device"],
        value: string
    ) => {
        const newConfig = {
            ...config,
            device: {
                ...config.device,
                [field]: value,
            },
        };
        onChange(newConfig);
    };

    const resetToDefaults = () => {
        onChange(MEDUSAE_DEFAULTS);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-[100] bg-brand text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
                title="Partikül Ayarları"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-[100] w-80 max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand rounded-full animate-pulse"></span>
                    Partikül Laboratuvarı
                </h3>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Halo Category */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <span>Halo (Halka)</span>
                        <div className="flex-1 h-[1px] bg-gray-100"></div>
                    </div>
                    <div className="space-y-3">
                        <Slider
                            label="Taban Yarıçap"
                            value={config.halo.radiusBase}
                            min={0.1}
                            max={10.0}
                            step={0.1}
                            onChange={(v) => handleSliderChange("halo", "radiusBase", v)}
                        />
                        <Slider
                            label="Halka Kalınlığı"
                            value={config.halo.rimWidth}
                            min={0.1}
                            max={5.0}
                            step={0.1}
                            onChange={(v) => handleSliderChange("halo", "rimWidth", v)}
                        />
                        <Slider
                            label="Nefes Genliği"
                            value={config.halo.radiusAmplitude}
                            min={0}
                            max={2.0}
                            step={0.05}
                            onChange={(v) => handleSliderChange("halo", "radiusAmplitude", v)}
                        />
                        <Slider
                            label="Form Bozulması"
                            value={config.halo.shapeAmplitude}
                            min={0}
                            max={5.0}
                            step={0.1}
                            onChange={(v) => handleSliderChange("halo", "shapeAmplitude", v)}
                        />
                    </div>
                </section>

                {/* Particles Category */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <span>Parçacıklar</span>
                        <div className="flex-1 h-[1px] bg-gray-100"></div>
                    </div>
                    <div className="space-y-3">
                        <Slider
                            label="Normal Boyut"
                            value={config.particles.baseSize}
                            min={0.001}
                            max={0.1}
                            step={0.001}
                            onChange={(v) => handleSliderChange("particles", "baseSize", v)}
                        />
                        <Slider
                            label="Aktif Boyut"
                            value={config.particles.activeSize}
                            min={0.001}
                            max={0.2}
                            step={0.001}
                            onChange={(v) => handleSliderChange("particles", "activeSize", v)}
                        />
                        <Slider
                            label="Dönüş Hızı"
                            value={config.particles.rotationSpeed}
                            min={0}
                            max={2.0}
                            step={0.05}
                            onChange={(v) => handleSliderChange("particles", "rotationSpeed", v)}
                        />
                        <div className="grid grid-cols-2 gap-2 pt-2">
                            <ColorPicker
                                label="Taban"
                                value={config.particles.colorBase}
                                onChange={(v) => handleColorChange("colorBase", v)}
                            />
                            <ColorPicker
                                label="Renk 1"
                                value={config.particles.colorOne}
                                onChange={(v) => handleColorChange("colorOne", v)}
                            />
                            <ColorPicker
                                label="Renk 2"
                                value={config.particles.colorTwo}
                                onChange={(v) => handleColorChange("colorTwo", v)}
                            />
                            <ColorPicker
                                label="Renk 3"
                                value={config.particles.colorThree}
                                onChange={(v) => handleColorChange("colorThree", v)}
                            />
                        </div>
                    </div>
                </section>

                {/* Device Category */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <span>Cihaz Animasyonu</span>
                        <div className="flex-1 h-[1px] bg-gray-100"></div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
                            <label className="text-xs font-medium text-gray-600">Renk Döngüsü (Cycle)</label>
                            <button
                                onClick={() => handleDeviceColorChange("enableAnimation", !config.device.enableAnimation as any)}
                                className={`w-10 h-5 rounded-full transition-colors relative ${config.device.enableAnimation ? 'bg-brand' : 'bg-gray-300'}`}
                            >
                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.device.enableAnimation ? 'left-6' : 'left-1'}`} />
                            </button>
                        </div>
                        <Slider
                            label="Animasyon Hızı"
                            value={config.device.animationSpeed}
                            min={1}
                            max={60}
                            step={1}
                            onChange={(v) => handleDeviceColorChange("animationSpeed", v as any)}
                        />
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider pt-2">
                        <span>Cihaz Etiketleri</span>
                        <div className="flex-1 h-[1px] bg-gray-100"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <ColorPicker label="Tarih" value={config.device.colorLabelTarih} onChange={(v) => handleDeviceColorChange("colorLabelTarih", v)} />
                        <ColorPicker label="Saat/Isı" value={config.device.colorLabelSaatIsi} onChange={(v) => handleDeviceColorChange("colorLabelSaatIsi", v)} />
                        <ColorPicker label="İmsak" value={config.device.colorLabelImsak} onChange={(v) => handleDeviceColorChange("colorLabelImsak", v)} />
                        <ColorPicker label="Sabah" value={config.device.colorLabelGunes} onChange={(v) => handleDeviceColorChange("colorLabelGunes", v)} />
                        <ColorPicker label="Öğle" value={config.device.colorLabelOgle} onChange={(v) => handleDeviceColorChange("colorLabelOgle", v)} />
                        <ColorPicker label="İkindi" value={config.device.colorLabelIkindi} onChange={(v) => handleDeviceColorChange("colorLabelIkindi", v)} />
                        <ColorPicker label="Akşam" value={config.device.colorLabelAksam} onChange={(v) => handleDeviceColorChange("colorLabelAksam", v)} />
                        <ColorPicker label="Yatsı" value={config.device.colorLabelYatsi} onChange={(v) => handleDeviceColorChange("colorLabelYatsi", v)} />
                        <ColorPicker label="ALLAH" value={config.device.colorLabelAllah} onChange={(v) => handleDeviceColorChange("colorLabelAllah", v)} />
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider pt-2">
                        <span>Cihaz Digitleri</span>
                        <div className="flex-1 h-[1px] bg-gray-100"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <ColorPicker label="Tarih D." value={config.device.colorDigitsTarih} onChange={(v) => handleDeviceColorChange("colorDigitsTarih", v)} />
                        <ColorPicker label="Saat D." value={config.device.colorDigitsSaat} onChange={(v) => handleDeviceColorChange("colorDigitsSaat", v)} />
                        <ColorPicker label="İmsak D." value={config.device.colorDigitsImsak} onChange={(v) => handleDeviceColorChange("colorDigitsImsak", v)} />
                        <ColorPicker label="Sabah D." value={config.device.colorDigitsGunes} onChange={(v) => handleDeviceColorChange("colorDigitsGunes", v)} />
                        <ColorPicker label="Öğle D." value={config.device.colorDigitsOgle} onChange={(v) => handleDeviceColorChange("colorDigitsOgle", v)} />
                        <ColorPicker label="İkindi D." value={config.device.colorDigitsIkindi} onChange={(v) => handleDeviceColorChange("colorDigitsIkindi", v)} />
                        <ColorPicker label="Akşam D." value={config.device.colorDigitsAksam} onChange={(v) => handleDeviceColorChange("colorDigitsAksam", v)} />
                        <ColorPicker label="Yatsı D." value={config.device.colorDigitsYatsi} onChange={(v) => handleDeviceColorChange("colorDigitsYatsi", v)} />
                    </div>
                </section>

                {/* Cursor Category */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <span>İmleç Etkisi</span>
                        <div className="flex-1 h-[1px] bg-gray-100"></div>
                    </div>
                    <div className="space-y-3">
                        <Slider
                            label="Sürüklenme (Drag)"
                            value={config.cursor.dragFactor}
                            min={0.001}
                            max={0.1}
                            step={0.001}
                            onChange={(v) => handleSliderChange("cursor", "dragFactor", v)}
                        />
                        <Slider
                            label="Yarıçap"
                            value={config.cursor.radius}
                            min={0.01}
                            max={0.5}
                            step={0.01}
                            onChange={(v) => handleSliderChange("cursor", "radius", v)}
                        />
                    </div>
                </section>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex gap-2">
                <button
                    onClick={resetToDefaults}
                    className="flex-1 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Sıfırla
                </button>
                <button
                    onClick={() => {
                        const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'particle-config.json';
                        a.click();
                    }}
                    className="flex-1 py-2 text-sm font-medium text-white bg-brand rounded-lg hover:bg-brand-strong transition-colors"
                >
                    Dışa Aktar
                </button>
            </div>
        </div>
    );
}

function Slider({
    label,
    value,
    min,
    max,
    step,
    onChange,
}: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (v: number) => void;
}) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-gray-600">{label}</label>
                <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">
                    {value.toFixed(3)}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand"
            />
        </div>
    );
}

function ColorPicker({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="flex items-center gap-2 p-1.5 border border-gray-100 rounded-lg bg-white">
            <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-6 h-6 rounded border-0 p-0 cursor-pointer overflow-hidden"
            />
            <label className="text-[10px] font-medium text-gray-500 truncate">{label}</label>
        </div>
    );
}
