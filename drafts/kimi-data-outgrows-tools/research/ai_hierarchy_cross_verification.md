# Cross-Verification: AI Hierarchy Research

## High Confidence Findings (Confirmed by 2+ agents)

1. **Rule-based systems face combinatorial explosion**: XCON grew from 250 to 10,000+ rules; modern fraud systems have 300-800+ rules per bank. Confirmed by Dim01 (expert systems history) and Dim05 (production banking systems).

2. **Tree models dominate tabular data**: XGBoost/LightGBM outperform neural networks on structured data. Kaggle analysis confirms GBDTs win most tabular competitions. Confirmed by Dim02 (benchmarks) and Dim03 (CNN tabular failure).

3. **AlexNet was the watershed moment**: 15.3% top-5 error on ImageNet 2012 vs. 26.2% second place. Confirmed by Dim03 and multiple independent sources.

4. **LLMs are coherence-optimized, not precision-optimized**: GPT-4 gives confident wrong answers on CSV data. Confirmed by Dim04 (hallucination studies, 28.6% rate) and Dim05 (hybrid architecture evidence).

5. **Four layers coexist in production**: Modern systems combine rules + ML + DL + LLMs. Confirmed by Dim01 (rules still run on COBOL), Dim02 (XGBoost in production), Dim03 (CNNs for imaging), Dim04 (LLMs for text), Dim05 (hybrid architectures).

6. **GPU acceleration enabled deep learning**: Before 2012, training deep networks was impractical. GPUs made it feasible. Confirmed by Dim03.

7. **Regulatory requirements favor explainability**: EU AI Act, GDPR Article 22, banking regulations all require auditable decisions. Confirmed by Dim01 and Dim02.

## Medium Confidence Findings

8. **CNNs learn hierarchical features**: Early layers detect edges, deep layers detect objects (Zeiler & Fergus). Single study but highly cited and replicated.

9. **Medical AI matches specialists**: Stanford skin cancer CNN at 72.1% vs. dermatologists at 65.6%. Single landmark study with follow-up confirmations.

10. **Chain-of-thought improves LLM reasoning 30-61 points**: From Galileo AI analysis. Single source but consistent with broader literature.

11. **XGBoost latency is sub-millisecond to millisecond range**: Dim02 shows 7.5s training on 100K samples; Dim05 shows 1.5M flows/sec. Exact numbers vary by hardware.

12. **Training GPT-4 cost $78-100M**: Stanford AI Index report. Single authoritative source.

## Conflict Zones

13. **CNN vs. XGBoost on tabular data**: Dim02 says deep learning underperforms trees on tabular. Dim03 mentions some deep models (TabNet, NODE) can beat XGBoost by 7-14% on specific datasets. Resolution: Trees are better on most tabular tasks; specialized deep architectures can win on specific datasets but at much higher cost.

14. **Training time claims**: Dim02 shows XGBoost on 50K rows trains in under a minute (realistically seconds). User's outline says "3 minutes" — conservative but realistic for full pipeline with CV.

15. **Rule system maintenance burden**: Dim01 cites 35% of fraud team time on rule maintenance. Dim05 notes rules still run in production. These are compatible — rules require significant maintenance but are kept for latency/compliance advantages.
