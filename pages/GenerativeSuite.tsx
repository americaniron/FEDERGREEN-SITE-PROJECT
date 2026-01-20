
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUp, ScanSearch, Clapperboard, Loader2, AlertTriangle, CheckCircle2, Film, Image as ImageIcon } from 'lucide-react';
import { analyzeImage, generateVideo, getVideoOperation } from '../services/geminiService';

const LogoMark: React.FC<{ className?: string, color?: string }> = ({ className = "w-5 h-5", color = "#1b2e2a" }) => (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <rect width="100" height="100" rx="24" fill={color} />
      <path d="M30 30H70V38H40V48H65V56H40V72H30V30Z" fill="white" />
    </svg>
);

const Workshop: React.FC = () => {
  // Image Analysis State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageResult, setImageResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Video Generation State
  const [videoPrompt, setVideoPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [videoResult, setVideoResult] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [apiKeyError, setApiKeyError] = useState(false);
  const pollIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    (async () => {
      const keySelected = await (window as any).aistudio.hasSelectedApiKey();
      setHasApiKey(keySelected);
    })();
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImageResult(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeImage = async () => {
    if (!imageFile || !imagePrompt) return;
    setIsAnalyzing(true);
    setImageResult(null);
    try {
      const base64 = imagePreview?.split(',')[1];
      if (base64) {
        const result = await analyzeImage(base64, imageFile.type, imagePrompt);
        setImageResult(result);
      }
    } catch (e) {
      setImageResult("Analysis failed. The asset may be corrupted or the node is offline.");
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleSelectKey = async () => {
    await (window as any).aistudio.openSelectKey();
    setHasApiKey(true); // Optimistically set to true
    setApiKeyError(false);
  };

  const handleGenerateVideo = async () => {
    if (!videoPrompt || !hasApiKey) return;
    setIsGenerating(true);
    setVideoResult(null);
    setGenerationStatus("Initializing Veo node...");
    setApiKeyError(false);

    try {
      let operation = await generateVideo(videoPrompt, aspectRatio);
      setGenerationStatus("Video synthesis in progress (may take several minutes)...");

      pollIntervalRef.current = window.setInterval(async () => {
        try {
          operation = await getVideoOperation(operation);
          if (operation.done) {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
            setGenerationStatus("Synthesis complete. Fetching asset...");
            const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
            if (downloadLink) {
              const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
              const blob = await response.blob();
              setVideoResult(URL.createObjectURL(blob));
            } else {
               setGenerationStatus("Generation failed: No video URI returned.");
            }
            setIsGenerating(false);
          }
        } catch (pollError: any) {
            if (pollError.message.includes("Requested entity was not found.")) {
                setApiKeyError(true);
                setHasApiKey(false);
                setGenerationStatus("API Key validation failed. Please select a valid key.");
                if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
                setIsGenerating(false);
            }
        }
      }, 10000);

    } catch (e: any) {
      if (e.message.includes("Requested entity was not found.")) {
        setApiKeyError(true);
        setHasApiKey(false);
        setGenerationStatus("API Key validation failed. Please select a valid key.");
      } else {
        setGenerationStatus("Failed to initiate video generation.");
      }
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-brand-stone min-h-screen py-32 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
            <LogoMark className="w-20 h-20 mx-auto mb-8 opacity-20" />
          <h1 className="serif text-7xl text-brand-primary font-black leading-[0.9] tracking-tighter mb-8 italic">
            Generative AI Workshop
          </h1>
          <p className="text-brand-slate text-xl max-w-2xl leading-relaxed font-medium mx-auto">
            Institutional-grade generative tools for asset analysis and strategic visualization in our secure digital workshop.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Analyzer */}
          <div className="bg-white p-12 rounded-[3.5rem] border border-brand-stone shadow-xl space-y-10">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-brand-stone border border-brand-stone rounded-2xl text-brand-primary"><ImageIcon size={24}/></div>
                <div>
                    <h2 className="serif text-3xl font-black text-brand-primary italic tracking-tight">Document & Asset Analyzer</h2>
                    <p className="text-[10px] text-brand-slate font-black uppercase tracking-widest">Powered by Gemini 3 Pro</p>
                </div>
            </div>
            
            <div className="aspect-video bg-brand-stone/40 border-2 border-dashed border-brand-stone/80 rounded-3xl flex items-center justify-center relative">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                {imagePreview ? (
                    <img src={imagePreview} alt="upload preview" className="w-full h-full object-contain rounded-3xl" />
                ) : (
                    <div className="text-center text-brand-slate/40 space-y-4">
                        <FileUp size={48} className="mx-auto" />
                        <p className="font-bold text-sm">Upload Document or Asset Image</p>
                    </div>
                )}
            </div>
            
            <textarea value={imagePrompt} onChange={e => setImagePrompt(e.target.value)} placeholder="Enter analysis prompt (e.g., 'Analyze the cap table for dilution risk...')" rows={3} className="w-full bg-brand-stone/30 p-4 rounded-xl text-sm outline-none border border-transparent focus:border-brand-accent transition-all"/>
            
            <button onClick={handleAnalyzeImage} disabled={!imageFile || !imagePrompt || isAnalyzing} className="w-full py-5 bg-brand-primary text-brand-stone rounded-2xl font-black uppercase text-[11px] tracking-widest flex items-center justify-center hover:bg-brand-accent transition-all disabled:opacity-30">
                {isAnalyzing ? <Loader2 className="animate-spin" /> : <><ScanSearch size={16} className="mr-3"/>Analyze Image</>}
            </button>

            <AnimatePresence>
                {imageResult && <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="p-6 bg-brand-stone rounded-2xl border border-brand-stone/20 text-sm text-brand-slate italic font-medium whitespace-pre-wrap">{imageResult}</motion.div>}
            </AnimatePresence>
          </div>

          {/* Video Generator */}
          <div className="bg-brand-primary text-brand-stone p-12 rounded-[3.5rem] shadow-2xl space-y-10 border border-brand-accent/10">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-brand-stone/10 border border-brand-stone/20 rounded-2xl"><Film size={24}/></div>
                <div>
                    <h2 className="serif text-3xl font-black italic tracking-tight">Strategic Vision Synthesizer</h2>
                    <p className="text-[10px] text-brand-accent font-black uppercase tracking-widest">Powered by Veo 3.1</p>
                </div>
            </div>
            
            <div className="aspect-video bg-brand-stone/5 border-2 border-dashed border-brand-stone/20 rounded-3xl flex items-center justify-center">
                {isGenerating ? (
                     <div className="text-center text-brand-stone/70 space-y-4 p-4">
                        <Loader2 size={48} className="mx-auto animate-spin text-brand-accent" />
                        <p className="font-bold text-sm uppercase tracking-widest">{generationStatus}</p>
                    </div>
                ) : videoResult ? (
                    <video src={videoResult} controls autoPlay loop className="w-full h-full object-contain rounded-3xl" />
                ) : (
                    <div className="text-center text-brand-stone/30 space-y-4">
                        <Clapperboard size={48} className="mx-auto" />
                        <p className="font-bold text-sm">Video Artifact Will Appear Here</p>
                    </div>
                )}
            </div>

            <textarea value={videoPrompt} onChange={e => setVideoPrompt(e.target.value)} placeholder="Enter video prompt (e.g., 'A cinematic shot of a new real estate development...')" rows={3} className="w-full bg-brand-stone/5 p-4 rounded-xl text-sm outline-none border border-transparent focus:border-brand-accent transition-all"/>
            
            <div className="flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-stone/50">Aspect Ratio</p>
                <div className="flex items-center space-x-2">
                    <button onClick={()=>setAspectRatio('16:9')} className={`px-4 py-2 text-xs font-bold rounded-lg ${aspectRatio === '16:9' ? 'bg-brand-accent text-brand-primary' : 'bg-brand-stone/10 text-brand-stone/50'}`}>16:9</button>
                    <button onClick={()=>setAspectRatio('9:16')} className={`px-4 py-2 text-xs font-bold rounded-lg ${aspectRatio === '9:16' ? 'bg-brand-accent text-brand-primary' : 'bg-brand-stone/10 text-brand-stone/50'}`}>9:16</button>
                </div>
            </div>
            
            {!hasApiKey || apiKeyError ? (
                <div className="p-6 bg-brand-accent/10 border border-brand-accent/20 rounded-2xl text-center space-y-4">
                    <AlertTriangle className="mx-auto text-brand-accent" />
                    <h4 className="text-sm font-bold text-brand-accent">API Key Required for Veo</h4>
                    <p className="text-xs text-brand-stone/50">Video generation requires a user-selected API key from a paid GCP project. Please <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline">review billing documentation</a>.</p>
                    <button onClick={handleSelectKey} className="w-full py-4 bg-brand-accent text-brand-primary rounded-xl font-black uppercase text-[11px] tracking-widest">Select API Key</button>
                </div>
            ) : (
                <button onClick={handleGenerateVideo} disabled={!videoPrompt || isGenerating} className="w-full py-5 bg-brand-accent text-brand-primary rounded-2xl font-black uppercase text-[11px] tracking-widest flex items-center justify-center hover:bg-brand-stone transition-all disabled:opacity-30">
                    {isGenerating ? <Loader2 className="animate-spin" /> : <><Clapperboard size={16} className="mr-3"/>Generate Video</>}
                </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshop;
