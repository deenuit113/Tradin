export interface BreadCrumbUIProps {
    pathSegments: string[]
    handleSave: (index: number) => void
    handleEdit: (segment: string, index: number) => void
    editingSegment: string | null
    editValue: string
    isEditablePath: (path: string[]) => boolean
    setEditValue: React.Dispatch<React.SetStateAction<string>>
}