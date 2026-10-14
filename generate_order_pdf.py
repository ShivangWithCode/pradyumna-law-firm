import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT

def generate_order_pdf():
    output_dir = os.path.join(os.getcwd(), 'public', 'assets', 'docs')
    os.makedirs(output_dir, exist_ok=True)
    pdf_path = os.path.join(output_dir, 'Official_Government_Order_Gazette_Nov_2025.pdf')

    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        rightMargin=45,
        leftMargin=45,
        topMargin=45,
        bottomMargin=45
    )

    styles = getSampleStyleSheet()

    # Custom styles
    style_order_no = ParagraphStyle(
        'OrderNo',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#0F172A')
    )

    style_header_main = ParagraphStyle(
        'HeaderMain',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#0F172A')
    )

    style_header_sub = ParagraphStyle(
        'HeaderSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10.5,
        leading=14.5,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#1E293B')
    )

    style_dispatch = ParagraphStyle(
        'DispatchMeta',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        alignment=TA_RIGHT,
        textColor=colors.HexColor('#1E293B')
    )

    style_order_title = ParagraphStyle(
        'OrderTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#000000')
    )

    style_body = ParagraphStyle(
        'OrderBody',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=10,
        leading=15,
        alignment=TA_JUSTIFY,
        textColor=colors.HexColor('#0F172A')
    )

    style_table_header = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#0F172A')
    )

    style_cell_text = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#0F172A')
    )

    style_cell_center = ParagraphStyle(
        'TableCellCenter',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#0F172A')
    )

    style_footnote = ParagraphStyle(
        'Footnote',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8,
        leading=11.5,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#475569')
    )

    story = []

    # Reference Number
    story.append(Paragraph("<b>No. J-11017/26/2025-Judicial/E.166742</b>", style_order_no))
    story.append(Spacer(1, 6))

    # Government Header Block
    story.append(Paragraph("<b>Government of India</b>", style_header_main))
    story.append(Paragraph("<b>Ministry of Law &amp; Justice</b>", style_header_main))
    story.append(Paragraph("Department of Legal Affairs", style_header_sub))
    story.append(Paragraph("(Judicial Section)", style_header_sub))
    story.append(Paragraph("★ ★ ★ ★ ★", ParagraphStyle('Stars', alignment=TA_CENTER, fontSize=8, textColor=colors.HexColor('#64748B'))))
    story.append(Spacer(1, 8))

    # Dispatch Meta
    dispatch_text = "Shastri Bhawan, New Delhi<br/>Dated the 21<sup>st</sup> November, 2025"
    story.append(Paragraph(dispatch_text, style_dispatch))
    story.append(Spacer(1, 14))

    # ORDER Title
    story.append(Paragraph("<u><b>ORDER</b></u>", style_order_title))
    story.append(Spacer(1, 12))

    # Legal Verbatim Body
    body_p = (
        "In continuation of this Department's earlier Orders in relation to engagement of Advocates "
        "for the Supreme Court of India, the President is pleased to <b>engage</b> the Advocates as per "
        "<b>Table-'X'</b> below, for conducting Central Government litigation before the Supreme Court of India, "
        "for a period of three years with effect from the date of this order or until further orders, "
        "whichever is earlier; the President is also pleased to <b>up-grade/revise</b> the earlier engaged Panel "
        "Counsel mentioned in the Table-'Y' below, as Group 'A', 'B' and 'C' Panel Counsel for the Supreme Court "
        "of India for a period of three years with effect from the date of this order or until further orders, "
        "whichever is earlier, consequently, names of these up-graded/revised Advocates, occurring in the "
        "aforesaid Table-'Y' in their respective order against their names, stand deleted:"
    )
    story.append(Paragraph(body_p, style_body))
    story.append(Spacer(1, 14))

    # Section Marker
    table_tag = Paragraph(
        "<b>Table-'X' &bull; Supreme Court of India Panel Extract [Page 20]</b>",
        ParagraphStyle('TableTag', fontName='Helvetica-Bold', fontSize=9, textColor=colors.HexColor('#003C8C'))
    )
    story.append(table_tag)
    story.append(Spacer(1, 6))

    # Gazette Table
    table_data = [
        [
            Paragraph("<b>S.No.</b>", style_table_header),
            Paragraph("<b>Name of Advocate</b>", style_table_header),
            Paragraph("<b>Address &amp; Contact Details</b>", style_table_header),
            Paragraph("<b>Enrolment No.</b>", style_table_header)
        ],
        [
            Paragraph("<b>270.</b>", style_cell_center),
            Paragraph("<b>PRADYUMNA TYAGI</b><br/><font size='7.5' color='#003C8C'><b>Central Govt. Panel Counsel</b><br/>Supreme Court Litigation</font>", style_cell_text),
            Paragraph("50, First Floor, Todarmal Road, Bengali Market,<br/>Delhi – 110001<br/><b>Mob:</b> 7503455000<br/><b>Email:</b> Pradyumna.ptlo@gmail.com", style_cell_text),
            Paragraph("<b>D/4782/2016</b><br/><font size='7' color='#475569'>Bar Council of Delhi</font>", style_cell_center)
        ]
    ]

    t = Table(table_data, colWidths=[45, 150, 215, 95])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#F1F5F9')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor('#0F172A')),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#CBD5E1')),
        ('BACKGROUND', (0, 1), (-1, 1), colors.HexColor('#F0F7FF')),
        ('BOX', (0, 0), (-1, -1), 1.5, colors.HexColor('#003C8C'))
    ]))
    story.append(t)
    story.append(Spacer(1, 16))

    # Compliance & Verification Seal Block
    compliance_text = (
        "<b>* Official Extract Note:</b> This document constitutes the verified excerpt pertaining to S.No. 270 "
        "from Gazette Order No. J-11017/26/2025-Judicial/E.166742 issued by the Ministry of Law &amp; Justice, "
        "Department of Legal Affairs, Government of India, Shastri Bhawan, New Delhi dated 21.11.2025. "
        "Official engagement of Advocate Pradyumna Tyagi for conducting Central Government litigation before the "
        "Hon'ble Supreme Court of India."
    )
    story.append(Paragraph(compliance_text, style_footnote))
    story.append(Spacer(1, 16))

    # Authority Signature Simulation Block
    sig_data = [
        [
            Paragraph("<b>VERIFIED OFFICIAL RECORD</b><br/><font size='7.5' color='#16A34A'>✔ Authenticated Legal Extract</font><br/><font size='7' color='#64748B'>Ministry of Law &amp; Justice, GoI</font>", style_cell_text),
            Paragraph("<b>By Order and in the Name of the President</b><br/><br/><b>(Judicial Section)</b><br/>Department of Legal Affairs<br/>Ministry of Law &amp; Justice<br/>Government of India, New Delhi", ParagraphStyle('SigRight', fontName='Helvetica', fontSize=8.5, leading=11.5, alignment=TA_RIGHT, textColor=colors.HexColor('#1E293B')))
        ]
    ]
    sig_table = Table(sig_data, colWidths=[240, 265])
    sig_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('LINEABOVE', (0, 0), (-1, -1), 1, colors.HexColor('#E2E8F0'))
    ]))
    story.append(sig_table)

    # Build PDF
    doc.build(story)
    print("PDF generated successfully at:", pdf_path)

if __name__ == '__main__':
    generate_order_pdf()
