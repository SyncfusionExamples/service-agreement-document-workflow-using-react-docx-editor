
import { createRoot } from 'react-dom/client';
import * as React from 'react';
import { useRef, useState } from 'react';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { DocumentEditorContainerComponent, Inject, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './index.css';

const svcAgreementSfdt = {"sfdt":"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"};
const hostUrl = 'https://document.syncfusion.com/web-services/docx-editor/api/documenteditor/';

const REVIEW_TOOLBAR_ITEMS = [
  "Undo",
  "Redo",
  "Separator",
  "Comments",
  "TrackChanges",
  "Separator",
  "Find"
];
const APPROVAL_TOOLBAR_ITEMS = [
  "Undo",
  "Redo",
  "Separator",
  "Comments",
  "Separator",
  "Find"
];
const FINALIZED_TOOLBAR_ITEMS = [
  "Find",
  "Separator",
  {
    text: "Export PDF",
    tooltipText: "Export as PDF",
    template:
            '<button title="Export as PDF" class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib e-caret-hide" type="button">' +
            '<span class="e-btn-icon e-icons e-export-pdf e-icon-left"></span><span class="e-tbar-btn-text">' +
            'Export PDF',
    id: "export-pdf"
  },
  {
    text: "Export DOCX",
    tooltipText: "Export as DOCX",
    template:
            '<button title="Export as DOCX" class="e-tbar-btn e-tbtn-txt e-control e-btn e-lib e-caret-hide" type="button">' +
            '<span class="e-btn-icon e-icons e-export e-icon-left"></span><span class="e-tbar-btn-text">' +
            'Export DOCX',
    id: "export-docx"
  }
];

const workflowStages = [
    {
        id: "details-added",
        number: 1,
        title: "Agreement Details",
        description: "Add contract information"
    },
    {
        id: "review",
        number: 2,
        title: "Review",
        description: "Review the agreement"
    },
    {
        id: "approval",
        number: 3,
        title: "Approval",
        description: "Approve the agreement"
    },
    {
        id: "finalized",
        number: 4,
        title: "Finalization",
        description: "Finalize the agreement"
    }
];

const stageOrder = [
    "draft",
    "details-added",
    "review",
    "approval",
    "finalized"
];

const ContractReview = () => {
    const containerRef = useRef(null);
    const [currentStage, setCurrentStage] = useState("draft");

    const onCreated = () => {
        const container = containerRef.current;
        if (!container)
            return;
        container.documentEditor.open(JSON.stringify(svcAgreementSfdt));
        container.documentEditor.documentName = 'Vendor Service Agreement';
        container.documentChange = () => {
            container.documentEditor.focusIn();
        };
        container.toolbarClick = (args) => {
            switch (args.item.id) {
                case "export-pdf":
                    exportAsPdf();
                    break;
                case "export-docx":
                    exportAsDocx();
                    break;
            }
        };
    };

    const addDetails = () => {
        const documentEditor = containerRef.current?.documentEditor;
        if (!documentEditor) {
            return;
        }

        // Sample agreement details declared directly in the code.
        const agreementDetails = {
        effectiveDate: "10-Aug-2026",
        clientName: "Northwind Technologies Pvt. Ltd.",
        vendorName: "Contoso Consulting Services",
        scopeOfServices:
            "Design, implementation, and technical support services for the client's document management application.",
        startDate: "15-Aug-2026",
        endDate: "14-Aug-2027",
        currency: "USD",
        contractValue: "50,000",
        paymentDueDays: "30",
        governingLaw: "Laws of India",
        clientSignatoryName: "Arun Kumar",
        vendorSignatoryName: "David Miller"
        };

        /*
        * These field names must match the form-field names
        * available in the predefined DOCX template.
        */
        const formFieldData = [
        {
            fieldName: "effective_date",
            value: agreementDetails.effectiveDate
        },
        {
            fieldName: "client_name",
            value: agreementDetails.clientName
        },
        {
            fieldName: "vendor_name",
            value: agreementDetails.vendorName
        },
        {
            fieldName: "scope_of_services",
            value: agreementDetails.scopeOfServices
        },
        {
            fieldName: "start_date",
            value: agreementDetails.startDate
        },
        {
            fieldName: "end_date",
            value: agreementDetails.endDate
        },
        {
            fieldName: "currency",
            value: agreementDetails.currency
        },
        {
            fieldName: "contract_value",
            value: agreementDetails.contractValue
        },
        {
            fieldName: "payment_due_days",
            value: agreementDetails.paymentDueDays
        },
        {
            fieldName: "governing_law",
            value: agreementDetails.governingLaw
        },
        {
            fieldName: "client_signatory_name",
            value: agreementDetails.clientSignatoryName
        },
        {
            fieldName: "vendor_signatory_name",
            value: agreementDetails.vendorSignatoryName
        }
        ];

        documentEditor.importFormData(formFieldData);
        documentEditor.selection.moveToDocumentStart();
        documentEditor.focusIn();
        setCurrentStage("details-added");        
    };
    
    const startReview = () => {
        const container = containerRef.current;
        const documentEditor = container?.documentEditor;

        if (!container || !documentEditor) {
        return;
        }
        documentEditor.currentUser = "Legal Reviewer";
        documentEditor.userColor = "#2563EB";
        documentEditor.enableTrackChanges = true;
        documentEditor.isReadOnly = false;
        container.toolbarItems = REVIEW_TOOLBAR_ITEMS;
        container.dataBind();
        documentEditor.focusIn();
        setCurrentStage("review");
    };

    const startApproval = () => {
        const container = containerRef.current;
        const documentEditor = container?.documentEditor;

        if (!container || !documentEditor) {
            return;
        }
        documentEditor.currentUser = "Contract Approver";
        documentEditor.userColor = "#7C3AED";
        documentEditor.enableTrackChanges = false;
        documentEditor.isReadOnly = false;
        container.toolbarItems = APPROVAL_TOOLBAR_ITEMS;
        container.dataBind();

        const revisions = documentEditor.revisions || [];
        if (revisions.length > 0) {
            documentEditor.showRevisions = true;
        }
        documentEditor.focusIn();
        setCurrentStage("approval");
    };

    const finalizeDocument = () => {
        const container = containerRef.current;
        const documentEditor = container?.documentEditor;

        if (!container || !documentEditor) {
            return;
        }
        const remainingRevisions =
            documentEditor.revisions?.length || 0;

        if (remainingRevisions > 0) {
            documentEditor.showRevisions = true;
            documentEditor.focusIn();
            alert("The agreement cannot be finalized. Resolve all tracked change(s) first.");
            return;
        }

        container.toolbarItems = FINALIZED_TOOLBAR_ITEMS;
        container.dataBind();

        documentEditor.enableTrackChanges = false;
        documentEditor.showRevisions = false;
        documentEditor.isReadOnly = true;
        documentEditor.selection.moveToDocumentStart();
        setCurrentStage("finalized");
    };

    const exportAsPdf = () => {
        const container = containerRef.current;
        const documentEditor = container?.documentEditor;
        const element = document.getElementById('container');

        if (!container || !documentEditor || !element) {
            return;
        }
        createSpinner({
            target: element,
        });
        showSpinner(element);
        let exportFormat = "Pdf";
        let url = hostUrl + 'Export';
        let fileName = documentEditor.documentName;
        let http = new XMLHttpRequest();
        http.open('POST', url);
        http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        // Set the responseType to 'blob' to handle binary data
        http.responseType = 'blob'; 

        // Prepare data to send
        let sfdt = {
            Content: documentEditor.serialize(),
            Filename: fileName,
            Format: '.' + exportFormat
        };

        // Set up event listener for the response
        http.onload = function () {
            if (http.status === 200) {
                // Handle the response blob here
                let responseData = http.response;

                // Create a Blob URL for the response data
                let blobUrl = URL.createObjectURL(responseData);

                // Create a link element and trigger the download
                let downloadLink = document.createElement('a');
                downloadLink.href = blobUrl;
                downloadLink.download = fileName + '.' + (exportFormat).toLowerCase();
                document.body.appendChild(downloadLink);
                hideSpinner(element);
                downloadLink.click();

                // Cleanup: Remove the link and revoke the Blob URL
                document.body.removeChild(downloadLink);
                URL.revokeObjectURL(blobUrl);
            } else {
                // Handle errors
                console.error('Request failed with status:', http.status);
                hideSpinner(element);
            }
        };

        // Send the request with JSON.stringify(sfdt) as the request body
        http.send(JSON.stringify(sfdt));
    };

    const exportAsDocx = () => {
        const container = containerRef.current;
        const documentEditor = container?.documentEditor;

        if (!container || !documentEditor) {
            return;
        }
        documentEditor.save(documentEditor.documentName, 'Docx');

    };

    const getStageState = (stageId) => {
        const currentIndex = stageOrder.indexOf(currentStage);
        const stageIndex = stageOrder.indexOf(stageId);

        if (stageIndex < currentIndex) {
            return "completed";
        }

        if (stageId === currentStage) {
            return "current";
        }

        return "upcoming";
    };

    return (<div className='control-pane'>
      <div className='row' style = {{  display: "flex" }}>
        <div className="col-lg-10 control-section" id="target" style={{  width: "83.33333333%", position: "relative", paddingRight: "15px", paddingLeft: "15px" }}>
          <div id="container" style={{ display: 'block', height: 'calc(100vh - 10px)' }}>
            <DocumentEditorContainerComponent id="container" ref={containerRef} serviceUrl={hostUrl} showPropertiesPane={false}
                    enableSpellCheck={true} enableToolbar={true} toolbarMode={"Toolbar"} height="100%" 
                    created={onCreated}>
              <Inject services={[Toolbar]} />
            </DocumentEditorContainerComponent>
          </div>
        </div>

        <div className="col-lg-2 property-section" style={{ width: "16.66666667%", position: "relative", paddingRight: "15px", paddingLeft: "15px" }}>
            <div className="property-panel-header" style={{ paddingBottom: "15px" }}>
                <b>Service Agreement Workflow</b>
            </div><br/>

            {/* Workflow Stepper */}
            <div className="workflow-stepper">
                {workflowStages.map((stage, index) => {
                    const state = getStageState(stage.id);

                    return (
                        <div className="workflow-step-row" key={stage.id}>

                            {/* Left column: indicator + connector */}
                            <div className="workflow-step-rail">

                                <ButtonComponent
                                    className={`workflow-step-indicator workflow-indicator-${state}`}
                                    disabled={state === "upcoming"}
                                    aria-label={`Go to ${stage.title}`}
                                >
                                    {state === "completed" ? "✓" : stage.number}
                                </ButtonComponent>

                                {index < workflowStages.length - 1 && (
                                    <div
                                        className={`workflow-connector ${
                                            state === "completed"
                                                ? "workflow-connector-completed"
                                                : ""
                                        }`}
                                    />
                                )}

                            </div>

                            {/* Right column: stage information */}
                            <ButtonComponent
                                className={`workflow-step-content workflow-step-${state}`}
                                disabled={state === "upcoming"}
                            >
                                <div className="workflow-step-title">
                                    {stage.title}
                                </div>

                                <div className="workflow-step-description">
                                    {state === "completed"
                                        ? "Completed"
                                        : state === "current"
                                            ? "Current stage"
                                            : stage.description}
                                </div>
                            </ButtonComponent>

                        </div>
                    );
                })}
            </div>

            {/* Current stage information */}
            <div className="workflow-current-stage">

                {currentStage === "draft" && (
                    <>
                        <div className="workflow-current-title">
                            Agreement Details
                        </div>
                        <div className="workflow-current-description">
                            Add the required agreement details to begin the
                            review process.
                        </div>

                        <ButtonComponent
                            className="e-primary"
                            onClick={addDetails}
                        >
                            Add Agreement Details
                        </ButtonComponent>
                    </>
                )}

                {currentStage === "details-added" && (
                    <>
                        <div className="workflow-current-title">
                            Agreement Details
                        </div>
                        <div className="workflow-current-description">
                            Agreement details have been added. Continue to
                            the review stage.
                        </div>

                        <ButtonComponent
                            type="button"
                            className="e-primary"
                            onClick={startReview}
                        >
                            Continue to Review
                        </ButtonComponent>
                    </>
                )}

                {currentStage === "review" && (
                    <>
                        <div className="workflow-current-title">
                            Review
                        </div>
                        <div className="workflow-current-description">
                            Review the agreement content before sending it
                            for approval.
                        </div>

                        <ButtonComponent
                            className="e-primary"
                            onClick={startApproval}
                        >
                            Continue to Approval
                        </ButtonComponent>
                    </>
                )}

                {currentStage === "approval" && (
                    <>
                        <div className="workflow-current-title">
                            Approval
                        </div>
                        <div className="workflow-current-description">
                            Complete the approval step before finalizing
                            the agreement.
                        </div>

                        <ButtonComponent
                            className="e-primary"
                            onClick={finalizeDocument}
                        >
                            Finalize Agreement
                        </ButtonComponent>
                    </>
                )}

                {currentStage === "finalized" && (
                    <>
                        <div className="workflow-current-title">
                            Agreement Finalized
                        </div>

                        <div className="workflow-current-description">
                            The agreement is finalized and ready to export.
                        </div>

                        <div style={{ display: "flex", gap: "8px", marginTop: "12px"}}>

                            <ButtonComponent
                                className="e-primary"
                                onClick={exportAsPdf}
                            >
                                Export PDF
                            </ButtonComponent>

                            <ButtonComponent
                                className="e-primary"
                                onClick={exportAsDocx}
                            >
                                Export DOCX
                            </ButtonComponent>

                        </div>
                    </>
                )}

            </div>
        </div>
      </div>
    </div>);
};
export default ContractReview;
createRoot(document.getElementById('sample')).render(<ContractReview />);

